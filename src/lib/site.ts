import { buildGmailComposeHref } from "./mailto";

export const SITE = "https://garvailabs.com";

/** Contact details taken from garvailabs.com/contact-us. */
/** Contact form anchor (write a request). */
export const contactBookHref = "/contact#request";

/** Full-page Cal.com calendar fallback. */
export const calBookPath = "/book";

export const site = {
  name: "GARV AI LABS",
  email: "garvailabs@gmail.com",
  /** Gmail web compose — reliable in Chrome/Brave; mailto: often opens a blank tab on Windows. */
  gmailHref: buildGmailComposeHref("garvailabs@gmail.com", "", ""),
  phone: "+91 97190 70711",
  phoneHref: "+919719070711",
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
