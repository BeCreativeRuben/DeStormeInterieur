import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { getProject, projects } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.excerpt} Bekijk beelden en context van dit interieurproject in ${project.location}.`,
    openGraph: {
      images: [{ url: project.hero, width: 1200, height: 630, alt: project.title }],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article>
      <header className="relative aspect-[21/9] min-h-[220px] bg-foreground sm:min-h-[320px] lg:aspect-[21/8]">
        <Image
          src={project.hero}
          alt=""
          fill
          priority
          className="object-cover opacity-90"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-6xl px-5 pb-10 text-white sm:px-8 sm:pb-14">
          <p className="text-[0.65rem] uppercase tracking-[0.35em] text-white/75">
            {project.type}
          </p>
          <h1 className="mt-2 font-semibold uppercase tracking-[0.12em] text-3xl sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm text-white/80">
            {project.location} · {project.year}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        <h2 className="font-semibold uppercase tracking-[0.14em] text-sm">
          Over dit project
        </h2>
        <div className="mt-6 space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          <p>{project.context.challenge}</p>
          <p>{project.context.approach}</p>
          <p>{project.context.result}</p>
          {project.collaboration ? (
            <p className="font-medium text-foreground/80">{project.collaboration}</p>
          ) : null}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-4 px-5 sm:px-8">
        {project.gallery.map((src) => (
          <figure
            key={src}
            className="relative aspect-[16/9] w-full overflow-hidden bg-black/5"
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 72rem, 100vw"
            />
          </figure>
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 border border-black/10 bg-surface p-8 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.12em] text-sm">
              Vergelijkbaar traject?
            </p>
            <p className="mt-2 max-w-md text-sm text-muted">
              Herken je jezelf in dit type woning of uitdaging? We bespreken graag jouw
              project.
            </p>
          </div>
          <ButtonLink href="/contact">Vergelijkbaar traject bespreken</ButtonLink>
        </div>
        <p className="mt-10 text-center text-sm text-muted">
          <Link href="/projecten" className="underline-offset-4 hover:underline">
            ← Terug naar alle projecten
          </Link>
        </p>
      </div>
    </article>
  );
}
