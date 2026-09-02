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

/** Laptops/desktops often have no mailto handler (Brave, Chrome on Windows). */
export function prefersWebCompose(): boolean {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(pointer: fine)").matches;
}

/**
 * Open the system mail client via mailto.
 * Must run synchronously inside a click/submit handler (user gesture).
 */
export function openMailClient(href: string): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.location.href = href;
    return true;
  } catch {
    try {
      const link = document.createElement("a");
      link.href = href;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      return true;
    } catch {
      return false;
    }
  }
}

/** Open Gmail compose in a new tab — reliable on desktop browsers. */
export function openGmailCompose(href: string): boolean {
  if (typeof window === "undefined") return false;

  const tab = window.open(href, "_blank", "noopener,noreferrer");
  return tab !== null;
}

export function openDraft(draft: MailDraft): boolean {
  if (draft.tooLong) return false;
  return prefersWebCompose()
    ? openGmailCompose(draft.gmailHref)
    : openMailClient(draft.mailtoHref);
}

export function isMailtoWithinLimits(href: string): boolean {
  return href.length <= MAILTO_MAX_LENGTH;
}
