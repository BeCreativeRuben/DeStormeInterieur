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
    text: "We starten vanuit indeling en verhoudingen: een helder plan waarin circulatie, functies en maatwerk samenkomen.",
  },
  {
    title: "Materialen & kleur",
    text: "We werken met een doordacht palet van materialen en kleuren: tactiel, rustig en duurzaam waar het kan.",
  },
  {
    title: "Verlichtingsplan",
    text: "Verlichting wordt integraal meegenomen: sfeer en functionaliteit afgestemd op het gebruik van de ruimte.",
  },
  {
    title: "Begeleiding realisatie",
    text: "We stemmen af met aannemers en leveranciers en volgen het ontwerp op tot een correcte uitvoering.",
  },
  {
    title: "Styling & eindfase",
    text: "De laatste laag: textiel, kunst en objecten die het interieur afwerken zonder overdaad.",
  },
] as const;

const steps = [
  "Kennismaking — we bespreken je project, de ruimte en je verwachtingen.",
  "Voorstel & offerte — een helder overzicht van de aanpak en wat inbegrepen is.",
  "Ontwerp & keuzes — we werken het ontwerp uit met plannen, visualisaties en materiaalkeuzes.",
  "Bestelling & opvolging — coördinatie met leveranciers en opvolging van de uitvoering.",
  "Oplevering — afronding van het project met aandacht voor detail en styling.",
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
          Samenwerken met de studio verloopt in duidelijke stappen, met aandacht voor
          ontwerp, budget en prioriteiten.
        </p>
      </header>

      <section className="mt-20 border-t border-black/10 pt-16">
        <SectionTitle
          eyebrow="Aanbod"
          title="Wat we voor je kunnen betekenen"
          intro="Afhankelijk van je vraag werken we op maat, van een sterk concept tot volledige begeleiding van het project."
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
          intro="Een duidelijk traject, van eerste gesprek tot oplevering. Stap voor stap werken we naar een doordacht en afgewerkt interieur."
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
        <SectionTitle title="Praktische afspraken" />
        <ul className="mt-8 max-w-2xl list-disc space-y-3 pl-5 text-sm text-muted sm:text-base">
          <li>Beslissingen worden tijdig genomen binnen de afgesproken planning.</li>
          <li>Toegang tot de woning en relevante plannen wordt voorzien waar nodig.</li>
          <li>Open communicatie over budget en prioriteiten vormt de basis.</li>
        </ul>
      </section>

      <section className="mt-24 border-t border-black/10 pt-16">
        <SectionTitle title="Werkgebied" intro="Werkgebied voornamelijk België (Vlaanderen en Brussel). Projecten buiten deze regio zijn mogelijk in overleg." />
        <div className="mt-10">
          <ButtonLink href="/contact">Plan een kennismaking</ButtonLink>
        </div>
      </section>
    </div>
  );
}
