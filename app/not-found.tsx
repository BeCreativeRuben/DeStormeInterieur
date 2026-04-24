import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center sm:py-32">
      <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
        404
      </p>
      <h1 className="mt-4 font-semibold uppercase tracking-[0.14em] text-2xl">
        Pagina niet gevonden
      </h1>
      <p className="mt-4 text-sm text-muted">
        Deze pagina bestaat niet of werd verplaatst.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center justify-center bg-accent px-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground"
      >
        Naar home
      </Link>
    </div>
  );
}
