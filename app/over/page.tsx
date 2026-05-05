import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/ButtonLink";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over Rens Destorme",
  description:
    "Achter DESTORME DESIGN staat Rens Destorme: interieurdesign met een rustige, architecturale signatuur in België.",
};

export default function OverPage() {
  const portrait = projects[1]?.hero ?? projects[0].hero;
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-[4/5] w-full max-lg:max-h-[420px] bg-black/5 lg:sticky lg:top-24">
          <Image
            src={portrait}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
          />
        </div>
        <div>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
            Studio
          </p>
          <h1 className="mt-3 font-semibold uppercase tracking-[0.14em] text-3xl sm:text-4xl">
            Over DESTORME DESIGN
          </h1>
          <div className="mt-8 space-y-6 text-sm leading-relaxed text-muted sm:text-base">
            <p>
              DESTORME DESIGN is een interieurstudio van Rens Destorme.
            </p>
            <p>
              We ontwerpen interieurs met focus op rust, heldere lijnen en doordachte
              materiaalkeuzes.
            </p>
            <p>
              Elk project is maatwerk. We combineren ontwerpkennis met inzicht in hoe je
              dagelijks leeft, zodat een interieur niet alleen mooi oogt, maar ook echt
              werkt.
            </p>
          </div>

          <h2 className="mt-12 font-semibold uppercase tracking-[0.12em] text-sm">
            Visie in het kort
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted sm:text-base">
            <li>Minder trends, meer tijdloze rust en samenhang.</li>
            <li>Interieur als investering in dagelijks comfort.</li>
          </ul>

          <h2 className="mt-12 font-semibold uppercase tracking-[0.12em] text-sm">
            Meer beeld & updates
          </h2>
          <p className="mt-3 text-sm text-muted">
            Volg Destorme Design op{" "}
            <a
              href={site.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              Instagram ({site.instagramHandle})
            </a>
            .
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/projecten" variant="secondary">
              Bekijk realisaties
            </ButtonLink>
            <ButtonLink href="/contact">Plan een kennismaking</ButtonLink>
          </div>
        </div>
      </div>

    </div>
  );
}
