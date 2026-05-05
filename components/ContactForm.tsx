"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
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
  const [errorHints, setErrorHints] = useState<string[] | null>(null);
  const [partialWarning, setPartialWarning] = useState<string | null>(null);
  const successAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state !== "sent") return;
    successAnchorRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [state]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setErrorHints(null);
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
        code?: string;
        hints?: string[];
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
        setErrorHints(Array.isArray(json.hints) && json.hints.length ? json.hints : null);
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
      {state === "error" && error ? (
        <div className="text-sm text-red-700 dark:text-red-400" role="alert">
          <p>{error}</p>
          {errorHints?.length ? (
            <ul className="mt-2 list-disc pl-5 text-xs opacity-95">
              {errorHints.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
          <p className="mt-3 text-xs text-muted">
            Blijft dit gebeuren? Controleer in Resend dat je domein geverifieerd is en dat het
            afzenderadres (Vercel-omgevingsvariabele) daar exact bij past.
          </p>
        </div>
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

      <div ref={successAnchorRef} className="-mt-1 scroll-mt-24">
        {state === "sent" ? (
          <div
            className={`border-2 px-5 py-4 sm:px-6 sm:py-5 ${
              partialWarning
                ? "border-amber-400/80 bg-amber-50 text-foreground"
                : "border-emerald-500/55 bg-emerald-50/[0.65] text-foreground"
            }`}
            role="status"
            aria-live="polite"
            aria-labelledby="contact-success-heading"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                  partialWarning ? "bg-amber-200/80 text-amber-950" : "bg-emerald-500 text-white"
                }`}
                aria-hidden
              >
                {partialWarning ? (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : (
                  <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <h2 id="contact-success-heading" className="text-base font-semibold uppercase tracking-[0.14em] sm:text-lg">
                  {partialWarning ? "Bericht verwerkt" : "Verstuurd — je aanvraag is binnen"}
                </h2>
                {partialWarning ? (
                  <>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      Je bericht werd verwerkt. Lees hieronder de opmerking. Vragen? Bel{" "}
                      <a className="font-medium underline underline-offset-2" href={`tel:${site.phoneTel}`}>
                        {site.phoneDisplay}
                      </a>
                      .
                    </p>
                    <p className="text-sm font-medium leading-relaxed text-amber-950">{partialWarning}</p>
                  </>
                ) : (
                  <p className="text-sm leading-relaxed text-foreground/90">
                    Het formulier is succesvol verstuurd naar de studio. Je ontvangt{" "}
                    <strong className="font-semibold text-foreground">direct een bevestiging per e-mail</strong>{" "}
                    op het adres dat je hierboven ingaf. Check ook je spam-map. We antwoorden doorgaans binnen twee
                    werkdagen — liever nu al iets kwijt?{" "}
                    <a className="font-medium underline underline-offset-2" href={`tel:${site.phoneTel}`}>
                      Bel {site.phoneDisplay}
                    </a>
                    .
                  </p>
                )}
                <p className="pt-2">
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground underline underline-offset-[3px]"
                    onClick={() => {
                      setState("idle");
                      setPartialWarning(null);
                    }}
                  >
                    Nieuwe aanvraag
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </form>
  );
}
