import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionTitle } from "@/components/SectionTitle";

export const metadata: Metadata = {
  title: "Aanpak & diensten",
  description:
    "Hoe een traject verloopt bij DESTORME DESIGN: kennismaking, concept, realisatie en oplevering. Duidelijke verwachtingen voor jouw interieurproject.",
};

const services = [
  {
    title: "Interieurconcept & ruimtelijke organisatie",
    text: "Zithoeken, circulatie, ingebouwde kasten en verhoudingen: een helder plan voordat materialen gekozen worden.",
  },
  {
    title: "Materialen & kleur",
    text: "Een beperkt palet met tactiele kwaliteit — duurzaam waar het kan, visueel rustig waar het moet.",
  },
  {
    title: "Verlichtingsplan",
    text: "Sfeer én taakverlichting als onderdeel van het geheel, afgestemd op hoe je de ruimte gebruikt.",
  },
  {
    title: "Begeleiding realisatie",
    text: "Afstemming met aannemers en leveranciers zodat het ontwerp correct wordt uitgevoerd.",
  },
  {
    title: "Styling & eindfase",
    text: "De laatste laag: textiel, kunst en objecten die het interieur afmaken zonder drukte.",
  },
] as const;

const steps = [
  "Kennismaking — bezoek of call; scope, timing en verwachtingen.",
  "Voorstel & offerte — duidelijke scope: wat zit er wel en niet in.",
  "Ontwerp & keuzes — plannen, visuals en materialen waar nodig.",
  "Bestelling & opvolging — timing en coördinatie op de werf.",
  "Oplevering — afronden, nazorg en styling.",
] as const;

export default function AanpakPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="max-w-2xl">
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
          Praktisch
        </p>
        <h1 className="mt-3 font-semibold uppercase tracking-[0.14em] text-3xl sm:text-4xl">
          Aanpak & diensten
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-muted sm:text-base">
          Zo werkt samenwerken met het studio: transparant in stappen, met ruimte voor
          dialoog over budget en prioriteiten.
        </p>
      </header>

      <section className="mt-20 border-t border-black/10 pt-16">
        <SectionTitle
          eyebrow="Aanbod"
          title="Wat we voor je kunnen doen"
          intro="Afhankelijk van je vraag combineren we onderdelen — van enkel concept tot volledige begeleiding."
        />
        <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <li key={s.title}>
              <h2 className="font-semibold uppercase tracking-[0.1em] text-sm leading-snug">
                {s.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-24 border-t border-black/10 pt-16">
        <SectionTitle
          eyebrow="Traject"
          title="Hoe een traject verloopt"
          intro="Geen verrassingen in de volgorde: eerst verankeren we de basis, daarna werken we naar detail en oplevering."
        />
        <ol className="mt-12 max-w-2xl space-y-6">
          {steps.map((text, i) => (
            <li key={text} className="flex gap-4">
              <span className="mt-0.5 font-semibold tabular-nums text-foreground/25">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-relaxed text-muted sm:text-base">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-24 border-t border-black/10 pt-16">
        <SectionTitle title="Wat we van jou verwachten" />
        <ul className="mt-8 max-w-2xl list-disc space-y-3 pl-5 text-sm text-muted sm:text-base">
          <li>Beslissingsmomenten binnen de afgesproken termijn.</li>
          <li>Toegang tot de woning en bouwplannen waar nodig.</li>
          <li>Open communicatie over budget en prioriteiten.</li>
        </ul>
      </section>

      <section className="mt-24 border-t border-black/10 pt-16">
        <SectionTitle title="Werkgebied" intro="Voornamelijk in België (Vlaanderen en Brussel). Op aanvraag buiten de regio in overleg." />
        <div className="mt-10">
          <ButtonLink href="/contact">Vraag een kennismaking aan</ButtonLink>
        </div>
      </section>
    </div>
  );
}
