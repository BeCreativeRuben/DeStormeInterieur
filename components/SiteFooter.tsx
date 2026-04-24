import Link from "next/link";
import { site } from "@/lib/site";

const footerNav = [
  { href: "/projecten", label: "Projecten" },
  { href: "/aanpak", label: "Aanpak" },
  { href: "/over", label: "Over" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/10 bg-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-14 sm:flex-row sm:items-start sm:justify-between sm:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em]">
            {site.title}
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/80"
          aria-label="Footer"
        >
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <a
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            Instagram
          </a>
        </nav>
      </div>
      <div className="border-t border-black/5 py-6 text-center text-xs text-muted">
        © {year} {site.title}
      </div>
    </footer>
  );
}
