import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

const featured = projects.slice(0, 3);

export default function HomePage() {
  const hero = featured[0];
  return (
    <>
      <section className="relative flex min-h-[min(88vh,820px)] items-end bg-foreground">
        {hero ? (
          <Image
            src={hero.hero}
            alt=""
            fill
            priority
            className="object-cover opacity-85"
            sizes="100vw"
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-32 text-white sm:px-8 sm:pb-20">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-white/80">
            {site.tagline}
          </p>
          <h1 className="mt-4 max-w-xl font-semibold uppercase tracking-[0.12em] text-3xl leading-tight sm:text-4xl sm:tracking-[0.16em]">
            Interieur met rust, licht en precisie
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
            Interieurdesign voor woningen en projecten in België van concept tot
            afwerking, met oog voor materiaal en dagelijks comfort.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact" variant="primary">
              Project bespreken
            </ButtonLink>
            <ButtonLink href="/projecten" variant="secondary" className="!border-white/40 !text-white hover:!border-white hover:!bg-white/10">
              Projecten
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionTitle
          eyebrow="Portfolio"
          title="Geselecteerde projecten"
          intro="Een ingekaderde keuze uit recent werk. Kwaliteit en rust boven volume."
        />
        <ul className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link href={`/projecten/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-black/5">
                  <Image
                    src={p.hero}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <h3 className="mt-5 font-semibold uppercase tracking-[0.14em] text-base">
                  {p.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{p.type}</p>
                <span className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-foreground underline-offset-4 group-hover:underline">
                  Bekijk project
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-center">
          <ButtonLink href="/projecten" variant="ghost" className="!normal-case !tracking-normal text-sm">
            Alle projecten →
          </ButtonLink>
        </p>
      </section>

      <section className="border-y border-black/5 bg-surface">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 sm:grid-cols-2 sm:px-8 sm:py-24">
          <SectionTitle
            eyebrow="Werkwijze"
            title="Zo werken we samen"
            intro="Van eerste idee tot uitgewerkt ontwerp: een duidelijk traject met focus op indeling, materiaal en detail."
          />
          <ol className="space-y-10">
            {[
              {
                step: "01",
                title: "Kennismaking",
                text: "We starten met een gesprek of plaatsbezoek en bekijken samen de ruimtelijke wensen en mogelijkheden.",
              },
              {
                step: "02",
                title: "Concept & keuzes",
                text: "We vertalen het idee naar een concreet ontwerp met duidelijke indeling, materialen en sfeer.",
              },
              {
                step: "03",
                title: "Realisatie",
                text: "We volgen het project op tot de laatste afwerking, van uitvoering tot styling en oplevering.",
              },
            ].map((s) => (
              <li key={s.step} className="flex gap-6">
                <span className="font-semibold tabular-nums text-foreground/20">
                  {s.step}
                </span>
                <div>
                  <h3 className="font-semibold uppercase tracking-[0.12em] text-sm">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="sm:col-span-2">
            <ButtonLink href="/aanpak" variant="secondary">
              Ontdek onze aanpak
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/5] max-h-[480px] bg-black/5 lg:max-h-none">
            <Image
              src={featured[1]?.hero ?? featured[0].hero}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
          </div>
          <div>
            <SectionTitle
              title="Over DESTORME DESIGN"
              intro="DESTORME DESIGN is de interieurstudio van Rens De Storme, gericht op doordachte en rustige interieurs. Minder ruis, meer samenhang, zodat een ruimte niet alleen mooi is, maar ook blijft werken in het dagelijks gebruik."
            />
            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              Elk project vertrekt vanuit de manier waarop je leeft. We vertalen dit
              naar een helder ontwerp met aandacht voor indeling, materialen en detail.
            </p>
            <div className="mt-8">
              <ButtonLink href="/over" variant="secondary">
                Maak kennis
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground px-5 py-16 text-surface sm:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold uppercase tracking-[0.18em] text-lg">
              Klaar voor een nieuw project?
            </h2>
            <p className="mt-2 max-w-lg text-sm text-white/75">
              Werk je aan een renovatie, nieuwbouw of interieurproject? Vertel kort je
              plannen, we bekijken samen of we de juiste match zijn.
            </p>
          </div>
          <ButtonLink href="/contact" variant="primary">
            Start je project
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
