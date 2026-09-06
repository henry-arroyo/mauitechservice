/**
 * Site-wide contact and link settings. Edit here, not in components.
 */
export const site = {
  name: "Maui Tech Service",
  shortName: "MTS",
  url: "https://mauitechservice.com",
  phoneDisplay: "(808) 419-8760",
  phoneTel: "+18084198760",
  email: "info@mauitechservice.com",
  /** Online booking link (Calendly, Google Booking, etc). Leave empty to route
   *  the "Book a service call" buttons to the contact form instead. */
  bookingUrl: "",
  /** Google Business Profile link (reviews / directions). Optional. */
  googleListingUrl: "",
  sisterCompany: {
    name: "Hoʻokele Systems",
    url: "https://hookelesystems.com",
  },
} as const;
