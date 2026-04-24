import Link from "next/link";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/** Monogram: DD in cirkel met accentboog (merklijn). */
export function Logo({ className = "", withWordmark = false }: LogoProps) {
  const svg = (
    <svg
      viewBox="0 0 48 48"
      className={`h-10 w-10 shrink-0 ${className}`}
      aria-hidden
    >
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <circle
        cx="24"
        cy="24"
        r="21"
        fill="none"
        stroke="#e1f033"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="14 118"
        strokeDashoffset="52"
        transform="rotate(88 24 24)"
      />
      <text
        x="24"
        y="31"
        textAnchor="middle"
        fontSize="17"
        fontWeight="700"
        fontFamily="var(--font-montserrat), system-ui, sans-serif"
        fill="currentColor"
      >
        DD
      </text>
    </svg>
  );

  if (!withWordmark) {
    return (
      <Link href="/" className="inline-flex items-center gap-3 text-foreground">
        {svg}
        <span className="sr-only">DESTORME DESIGN — home</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-foreground hover:opacity-90"
    >
      {svg}
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold uppercase tracking-[0.22em]">
          Destorme
        </span>
        <span className="text-[0.65rem] font-light uppercase tracking-[0.45em] text-muted">
          Design
        </span>
      </span>
    </Link>
  );
}
