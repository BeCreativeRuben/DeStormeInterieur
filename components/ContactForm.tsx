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
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [partialWarning, setPartialWarning] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPartialWarning(null);
    setState("sending");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      projectType: String(data.get("projectType") ?? ""),
      location: String(data.get("location") ?? "").trim(),
      timing: String(data.get("timing") ?? ""),
      message: String(data.get("message") ?? "").trim(),
      privacy: data.get("privacy") === "on",
      _hp: String(data.get("_hp") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        partial?: boolean;
      };

      if (res.ok && json.ok) {
        setState("sent");
        form.reset();
        return;
      }

      if (res.status === 207 && json.error) {
        setPartialWarning(json.error);
        setState("sent");
        form.reset();
        return;
      }

      if (json.error) {
        setError(json.error);
        setState("error");
        return;
      }

      setError("Er ging iets mis. Probeer later opnieuw.");
      setState("error");
    } catch {
      setError("Geen verbinding. Controleer je netwerk en probeer opnieuw.");
      setState("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 border border-black/10 bg-surface p-6 sm:p-8"
    >
      {state === "sent" ? (
        <>
          <p className="text-sm text-muted" role="status">
            {partialWarning ? (
              <>
                Bedankt. Je aanvraag is verwerkt. Zie hieronder voor een korte opmerking. Liever
                direct contact? Bel{" "}
                <a className="text-foreground underline" href={`tel:${site.phoneTel}`}>
                  {site.phoneDisplay}
                </a>
                .
              </>
            ) : (
              <>
                Bedankt. Je aanvraag is verstuurd en je ontvangt zo meteen een bevestiging per
                e-mail. We nemen zo snel mogelijk contact met je op. Liever direct contact? Bel{" "}
                <a className="text-foreground underline" href={`tel:${site.phoneTel}`}>
                  {site.phoneDisplay}
                </a>
                .
              </>
            )}
          </p>
          {partialWarning ? (
            <p className="text-sm text-amber-800 dark:text-amber-200" role="status">
              {partialWarning}
            </p>
          ) : null}
          <p>
            <button
              type="button"
              className="text-sm font-medium text-foreground underline underline-offset-4"
              onClick={() => {
                setState("idle");
                setPartialWarning(null);
              }}
            >
              Nieuwe aanvraag
            </button>
          </p>
        </>
      ) : null}

      {state === "error" && error ? (
        <p className="text-sm text-red-700 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="hidden" aria-hidden="true">
        <label>
          Laat dit leeg
          <input type="text" name="_hp" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Naam *</span>
          <input
            required
            name="name"
            autoComplete="name"
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none ring-0 focus:border-foreground/40 disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">E-mail *</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Telefoon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-foreground">Type project *</span>
          <select
            required
            name="projectType"
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
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
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm sm:col-span-2">
          <span className="font-medium text-foreground">Timing *</span>
          <select
            required
            name="timing"
            disabled={state === "sending" || state === "sent"}
            className="border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
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
          disabled={state === "sending" || state === "sent"}
          className="resize-y border border-black/15 bg-background px-3 py-2.5 text-foreground outline-none focus:border-foreground/40 disabled:opacity-60"
          placeholder="Beschrijf kort je project, de ruimte en wat je zoekt. Eventueel met referenties of inspiratie."
        />
      </label>

      <label className="flex items-start gap-3 text-xs text-muted">
        <input
          type="checkbox"
          required
          name="privacy"
          disabled={state === "sending" || state === "sent"}
          className="mt-1 disabled:opacity-60"
        />
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
        disabled={state === "sending" || state === "sent"}
        className="min-h-11 bg-accent px-6 text-xs font-semibold uppercase tracking-[0.22em] text-accent-foreground transition enabled:hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? "Bezig met verzenden…" : "Verstuur aanvraag"}
      </button>
    </form>
  );
}
