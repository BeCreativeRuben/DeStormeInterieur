import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projecten",
  description:
    "Een selectie van interieurprojecten: van concept tot afwerking. Ontdek het werk van DESTORME DESIGN.",
};

export default function ProjectenPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
          Portfolio
        </p>
        <h1 className="mt-3 font-semibold uppercase tracking-[0.14em] text-3xl sm:text-4xl">
          Projecten
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
          Elk project wordt met dezelfde precisie benaderd: van ruimtelijke logica tot
          tactiele afwerking. Hieronder een selectie — beelden ter illustratie, vervang
          door eigen fotografie zodra beschikbaar.
        </p>
      </header>

      <ul className="mt-16 grid gap-12 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link href={`/projecten/${p.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                <Image
                  src={p.hero}
                  alt=""
                  fill
                  className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              </div>
              <h2 className="mt-6 font-semibold uppercase tracking-[0.14em] text-xl">
                {p.title}
              </h2>
              <p className="mt-1 text-sm text-muted">
                {p.location} · {p.year}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
              <span className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.2em] underline-offset-4 group-hover:underline">
                Bekijk project
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
