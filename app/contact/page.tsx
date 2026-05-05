import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { CopyEmail } from "@/components/CopyEmail";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met DESTORME DESIGN voor een kennismaking of vraag over je interieurproject in België.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <header>
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-muted">
            Start een traject
          </p>
          <h1 className="mt-3 font-semibold uppercase tracking-[0.14em] text-3xl sm:text-4xl">
            Contact
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
            Vertel kort over je project en je wensen. We bekijken elke aanvraag persoonlijk
            en geven binnen{" "}
            <strong className="font-medium text-foreground">twee werkdagen</strong> een
            eerste reactie.
          </p>

          <div className="mt-10 space-y-6 border-l-2 border-accent pl-6">
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
                E-mail
              </p>
              <p className="mt-1 text-xs text-muted">
                Aanvragen lopen via het formulier hiernaast. Dit adres kun je kopiëren voor
                ander contact.
              </p>
              <CopyEmail email={site.email} className="mt-2" />
            </div>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
                Telefoon
              </p>
              <a
                href={`tel:${site.phoneTel}`}
                className="mt-1 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.phoneDisplay}
              </a>
            </div>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.25em] text-muted">
                Instagram
              </p>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-foreground underline-offset-4 hover:underline"
              >
                {site.instagramHandle}
              </a>
            </div>
          </div>
        </header>

        <ContactForm />
      </div>
    </div>
  );
}
