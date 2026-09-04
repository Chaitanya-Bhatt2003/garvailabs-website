import { buildGmailComposeHref } from "./mailto";

export const SITE = "https://garvailabs.com";

/** Contact details taken from garvailabs.com/contact-us. */
/** Contact form anchor (write a request). */
export const contactBookHref = "/contact#request";

/** On-site booking page with embedded Cal.com calendar. */
export const calBookPath = "/book";

export const site = {
  name: "GARV AI LABS",
  email: "garvailabs@gmail.com",
  /** Native mail app — use on phones; mailto is reliable there. */
  mailtoHref: "mailto:garvailabs@gmail.com",
  /** Gmail web compose — reliable in Chrome/Brave on desktop Windows. */
  gmailHref: buildGmailComposeHref("garvailabs@gmail.com", "", ""),
  phone: "+91 92866 52872",
  phoneHref: "+919286652872",
  address: {
    line1: "Noida",
    line2: "Gautam Buddha Nagar, Uttar Pradesh",
    country: "India",
  },
  hours: "Mon–Sat, 10:00–19:00 IST",
};

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
