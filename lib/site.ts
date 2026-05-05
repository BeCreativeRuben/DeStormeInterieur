export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://destormedesign.be";

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
