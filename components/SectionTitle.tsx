type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  intro,
  align = "left",
}: SectionTitleProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow ? (
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-semibold uppercase tracking-[0.18em] text-foreground text-xl sm:text-2xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
