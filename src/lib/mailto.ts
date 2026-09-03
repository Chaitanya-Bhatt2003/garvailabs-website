const MAILTO_MAX_LENGTH = 2048;

export type MailDraft = {
  to: string;
  subject: string;
  body: string;
  mailtoHref: string;
  gmailHref: string;
  tooLong: boolean;
};

/** Build a standards-safe mailto href with encoded subject and body. */
export function buildMailtoHref(to: string, subject: string, body: string): string {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Gmail web compose — reliable on desktop Chrome/Brave when no mail app is set. */
export function buildGmailComposeHref(to: string, subject: string, body: string): string {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to,
    su: subject,
    body,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function buildMailDraft(to: string, subject: string, body: string): MailDraft {
  const mailtoHref = buildMailtoHref(to, subject, body);
  return {
    to,
    subject,
    body,
    mailtoHref,
    gmailHref: buildGmailComposeHref(to, subject, body),
    tooLong: mailtoHref.length > MAILTO_MAX_LENGTH,
  };
}

/**
 * True on laptops/desktops — mailto often has no handler on Windows.
 * False on phones/tablets — mailto opens the native Gmail/mail app reliably.
 */
export function prefersWebCompose(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: fine)").matches;
}

/** Programmatic click on a transient anchor (keeps the current page intact). */
function clickTransientLink(href: string, target?: "_blank"): void {
  const link = document.createElement("a");
  link.href = href;
  if (target) {
    link.target = target;
    link.rel = "noopener noreferrer";
  }
  // Keep the node in-flow for iOS Safari; display:none clicks are flaky there.
  link.setAttribute("aria-hidden", "true");
  link.tabIndex = -1;
  link.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px;opacity:0;";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Open the system / Gmail mail app via mailto.
 * On mobile, location.assign is the most reliable handoff to the mail app.
 * On desktop, never navigate the tab — use a transient click instead.
 */
export function openMailClient(href: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (!prefersWebCompose()) {
      window.location.assign(href);
      return true;
    }
    clickTransientLink(href);
    return true;
  } catch {
    return false;
  }
}

/** Open Gmail compose in a new tab (desktop). */
export function openGmailCompose(href: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    clickTransientLink(href, "_blank");
    return true;
  } catch {
    return false;
  }
}

/**
 * Desktop → Gmail web compose (mailto is unreliable in Chrome/Brave on Windows).
 * Mobile → mailto (opens the phone's Gmail/mail app with the draft filled in).
 */
export function openDraft(draft: MailDraft): boolean {
  if (draft.tooLong) return false;
  return prefersWebCompose()
    ? openGmailCompose(draft.gmailHref)
    : openMailClient(draft.mailtoHref);
}

export function isMailtoWithinLimits(href: string): boolean {
  return href.length <= MAILTO_MAX_LENGTH;
}
