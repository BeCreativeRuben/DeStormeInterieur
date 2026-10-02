export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://destormedesign.be";

/** Kept for inbound email forwarding (webhook fallback). Not for public branding. */
export const site = {
  title: "Website",
  tagline: "",
  description: "",
  email: "destormedesign@outlook.com",
  phoneDisplay: "",
  phoneTel: "",
  instagram: "",
  instagramHandle: "",
  locale: "nl-BE",
} as const;
