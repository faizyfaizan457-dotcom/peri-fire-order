/**
 * Business settings. Every value here is intended to be admin-editable once
 * the backend (Lovable Cloud) is enabled — the shape mirrors a `settings` table.
 *
 * Values marked REQUIRES BUSINESS INPUT are placeholders that must be
 * confirmed by the restaurant before going live.
 */
export const BUSINESS = {
  name: "Quayside Peri Peri",
  tagline: "Fire Grilled • Halal • Fresh",
  address: {
    line1: "79 Southgate Street",
    city: "Gloucester",
    postcode: "GL1 1UB",
    country: "United Kingdom",
  },
  phone: "01452 526623",
  mobile: "07574 275861",
  website: "www.quaysideperiperi.co.uk",
  mapsQuery: "79 Southgate Street, Gloucester, GL1 1UB",
  /** REQUIRES BUSINESS INPUT — set real handles in admin settings. */
  social: {
    instagram: "",
    facebook: "",
    tiktok: "",
  },
  /** REQUIRES BUSINESS INPUT — opening hours are not yet confirmed. */
  hours: [
    { day: "Monday", collection: "", delivery: "" },
    { day: "Tuesday", collection: "", delivery: "" },
    { day: "Wednesday", collection: "", delivery: "" },
    { day: "Thursday", collection: "", delivery: "" },
    { day: "Friday", collection: "", delivery: "" },
    { day: "Saturday", collection: "", delivery: "" },
    { day: "Sunday", collection: "", delivery: "" },
  ],
  /** REQUIRES BUSINESS INPUT — fees, zones and thresholds are placeholders. */
  delivery: {
    enabled: true,
    zones: [
      { id: "zone-1", name: "Zone 1 — City centre", postcodePrefixes: ["GL1"], fee: null, minimumOrder: null, etaMinutes: null, active: true },
      { id: "zone-2", name: "Zone 2", postcodePrefixes: ["GL2"], fee: null, minimumOrder: null, etaMinutes: null, active: true },
      { id: "zone-3", name: "Zone 3", postcodePrefixes: ["GL3", "GL4"], fee: null, minimumOrder: null, etaMinutes: null, active: false },
    ],
    freeDeliveryThreshold: null as number | null,
  },
  promotions: {
    onlineDiscountPercent: 10,
  },
  loyalty: {
    pointsPerPound: 10,
    /** REQUIRES BUSINESS INPUT — reward thresholds to be confirmed. */
    rewards: [
      { id: "free-fries", name: "Free Fries", points: 500 },
      { id: "free-drink", name: "Free Drink", points: 350 },
      { id: "free-burger", name: "Free 6oz Burger", points: 1200 },
      { id: "free-delivery", name: "Free Delivery", points: 400 },
    ],
  },
};

export const ALLERGEN_NOTICE =
  "If you have a food allergy or intolerance, please speak to our staff before ordering.";

export function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(value);
}
