import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

/** Gebruikt het echte aangeleverde merkteken in plaats van inline SVG. */
export function Logo({ className = "", withWordmark = false }: LogoProps) {
  const mark = (
    <Image
      src="/brand-mark.png"
      alt="DESTORME DESIGN monogram"
      width={40}
      height={40}
      className={`h-10 w-10 shrink-0 rounded-full object-cover ${className}`}
      priority
    />
  );

  if (!withWordmark) {
    return (
      <Link href="/" className="inline-flex items-center gap-3 text-foreground">
        {mark}
        <span className="sr-only">DESTORME DESIGN — home</span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-3 text-foreground hover:opacity-90"
    >
      {mark}
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
