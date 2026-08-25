// Patch DNS so Node never attempts IPv6 for registry hosts (broken route on this machine).
const dns = require("dns");
const net = require("net");

try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  /* ignore */
}

const originalLookup = dns.lookup.bind(dns);

dns.lookup = function patchedLookup(hostname, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  if (typeof options === "number") {
    options = { family: options };
  }
  const opts = { ...(options || {}), family: 4 };
  return originalLookup(hostname, opts, callback);
};

if (dns.promises?.lookup) {
  const originalPromiseLookup = dns.promises.lookup.bind(dns.promises);
  dns.promises.lookup = function patchedPromiseLookup(hostname, options) {
    const opts = typeof options === "number" ? { family: options } : { ...(options || {}), family: 4 };
    return originalPromiseLookup(hostname, opts);
  };
}

// Also force net.connect family when host is a name (best-effort).
const originalConnect = net.Socket.prototype.connect;
net.Socket.prototype.connect = function (...args) {
  const first = args[0];
  if (first && typeof first === "object" && first.host && !first.family) {
    first.family = 4;
  }
  return originalConnect.apply(this, args);
};
