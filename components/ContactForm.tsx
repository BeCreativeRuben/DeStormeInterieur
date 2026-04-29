"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";

const projectTypes = [
  "Volledige woning",
  "Renovatie",
  "Nieuwbouw",
  "Enkel advies",
  "Anders",
] as const;

const timings = [
  "Ik oriënteer me nog",
  "Binnen 6 maanden",
  "Later dan 6 maanden",
] as const;

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "");
    const location = String(data.get("location") ?? "").trim();
    const timing = String(data.get("timing") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Website: aanvraag van ${name || "bezoeker"}`);
    const body = encodeURIComponent(
      [
        `Naam: ${name}`,
        `E-mail: ${email}`,
        phone ? `Telefoon: ${phone}` : null,
        `Type project: ${projectType}`,
        `Locatie: ${location}`,
        `Timing: ${timing}`,
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    );

    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 border border-black/10 bg-surface p-6 sm:p-8"
    >
      {sent ? (
        <p className="text-sm text-muted" role="status">
          Je e-mailprogramma opent met een voorbereid bericht. Verstuur de mail om
          je aanvraag te verzenden. Liever direct contact? Bel{" "}
          <a className="text-foreground underline" href={`tel:${site.phoneTel}`}>
            {site.phoneDisplay}
          </a>
          .
        </p>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Naam *</span>
          <input
            required
            name="name"
            autoComplete="name"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none ring-0 focus:border-foreground/40"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">E-mail *</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Telefoon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Type project *</span>
          <select
            required
            name="projectType"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
            defaultValue=""
          >
            <option value="" disabled>
              Maak een keuze
            </option>
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Locatie (stad of postcode) *</span>
          <input
            required
            name="location"
            autoComplete="address-level2"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
          />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Timing *</span>
          <select
            required
            name="timing"
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
            defaultValue=""
          >
            <option value="" disabled>
              Maak een keuze
            </option>
            {timings.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium text-foreground">Bericht *</span>
        <textarea
          required
          name="message"
          rows={5}
          className="resize-y border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40"
          placeholder="Beschrijf kort je project, de ruimte en wat je zoekt. Eventueel met referenties of inspiratie."
        />
      </label>

      <label className="flex items-start gap-3 text-xs text-muted">
        <input type="checkbox" required name="privacy" className="mt-1" />
        <span>
          Ik ga akkoord met de verwerking van mijn gegevens zoals beschreven in het{" "}
          <a href="/privacy" className="text-foreground underline">
            privacybeleid
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        className="min-h-11 bg-accent px-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground transition hover:brightness-95"
      >
        Verstuur aanvraag
      </button>
    </form>
  );
}
