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

/** Gmail web compose — works in Brave/Chrome when no desktop mail app is set. */
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

/** True on laptops/desktops — mailto often has no handler on Windows. */
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
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

/**
 * Open the system mail client via mailto.
 * Never uses window.location — that navigates the tab to a blank page in Brave/Chrome
 * when no mail app is registered.
 */
export function openMailClient(href: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    clickTransientLink(href);
    return true;
  } catch {
    return false;
  }
}

/** Open Gmail compose in a new tab. */
export function openGmailCompose(href: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    clickTransientLink(href, "_blank");
    return true;
  } catch {
    return false;
  }
}

/** Always opens Gmail web compose — mailto: is unreliable in Chrome/Brave on Windows. */
export function openDraft(draft: MailDraft): boolean {
  if (draft.tooLong) return false;
  return openGmailCompose(draft.gmailHref);
}

export function isMailtoWithinLimits(href: string): boolean {
  return href.length <= MAILTO_MAX_LENGTH;
}
