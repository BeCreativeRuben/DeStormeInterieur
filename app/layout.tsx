import type { Metadata } from "next";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Website niet beschikbaar",
  description: "",
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: siteUrl,
    title: "Website niet beschikbaar",
    description: "",
  },
  twitter: {
    card: "summary",
    title: "Website niet beschikbaar",
    description: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="min-h-full font-sans antialiased">{children}</body>
    </html>
  );
}
