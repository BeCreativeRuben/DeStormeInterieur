import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
  secondary:
    "border border-foreground/15 bg-transparent text-foreground hover:border-foreground/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
  ghost: "text-foreground underline-offset-4 hover:underline",
};

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  className?: string;
  variant?: Variant;
};

export function ButtonLink({
  className = "",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const base =
    "inline-flex min-h-11 items-center justify-center px-6 text-xs font-semibold uppercase tracking-[0.22em] transition";
  return (
    <Link
      className={`${base} ${styles[variant]} ${variant !== "ghost" ? "rounded-sm" : ""} ${className}`}
      {...props}
    />
  );
}
