import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacybeleid van DESTORME DESIGN.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <h1 className="font-semibold uppercase tracking-[0.14em] text-2xl">Privacy</h1>
      <p className="mt-6 text-sm leading-relaxed text-muted">
        Dit is een verkorte privacyverklaring ter illustratie. Laat dit nakijken door
        een jurist voordat je live gaat (AVG / GDPR).
      </p>

      <h2 className="mt-10 font-semibold uppercase tracking-[0.1em] text-sm">
        Verantwoordelijke
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {site.title} — contact:{" "}
        <a className="text-foreground underline" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        .
      </p>

      <h2 className="mt-10 font-semibold uppercase tracking-[0.1em] text-sm">
        Gegevens via het contactformulier
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Wanneer je het formulier gebruikt, worden je gegevens via je eigen e-mailclient
        verstuurd. {site.title} gebruikt ze enkel om je aanvraag te behandelen en niet
        voor ongevraagde nieuwsbrieven, tenzij je daar uitdrukkelijk toestemming voor
        geeft.
      </p>

      <h2 className="mt-10 font-semibold uppercase tracking-[0.1em] text-sm">
        Bewaartermijn
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Berichten worden bewaard zolang nodig is voor de opvolging van je aanvraag en
        eventuele administratie rond een samenwerking.
      </p>

      <h2 className="mt-10 font-semibold uppercase tracking-[0.1em] text-sm">
        Rechten
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-muted">
        Je kan te allen tijde inzage, correctie of verwijdering van je gegevens vragen
        via het contactadres hierboven.
      </p>

      <p className="mt-14">
        <Link href="/" className="text-sm underline-offset-4 hover:underline">
          ← Terug naar home
        </Link>
      </p>
    </div>
  );
}
