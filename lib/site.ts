export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://destormedesign.be";

/** GA4 measurement ID. Override with NEXT_PUBLIC_GA_MEASUREMENT_ID. */
export const gaMeasurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-8QRRNE3FBJ";

export const site = {
  title: "DESTORME DESIGN",
  tagline: "Interior design studio",
  description:
    "Interieurdesign met aandacht voor ruimte, licht en materialen. Studio van Rens Destorme, België.",
  email: "destormedesign@outlook.com",
  phoneDisplay: "+32 496 25 86 99",
  phoneTel: "+32496258699",
  instagram: "https://www.instagram.com/destormedesign/",
  instagramHandle: "@destormedesign",
  locale: "nl-BE",
} as const;
