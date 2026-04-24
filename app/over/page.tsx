import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Over Rens De Storme",
  description:
    "Achter DESTORME DESIGN staat Rens De Storme: interieurdesign met een rustige, architecturale signatuur in België.",
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
              DESTORME DESIGN is het interieuratelier van{" "}
              <strong className="font-medium text-foreground">Rens De Storme</strong>.
              Het werk vertrekt vanuit architecturale rust: heldere volumes, eerlijke
              materialen en licht als dragende laag.
            </p>
            <p>
              Elk traject is maatwerk. We combineren vakkennis met luisteren naar hoe je
              dagelijks leeft — zodat het interieur niet alleen goed fotografeert, maar
              vooral blijft werken als je er woont.
            </p>
          </div>

          <h2 className="mt-12 font-semibold uppercase tracking-[0.12em] text-sm">
            Visie in het kort
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted sm:text-base">
            <li>— Minder trends, meer tijdloos samenspel van ruimte en detail.</li>
            <li>— Design als investering in dagelijks comfort.</li>
          </ul>

          <h2 className="mt-12 font-semibold uppercase tracking-[0.12em] text-sm">
            Meer beeld & updates
          </h2>
          <p className="mt-3 text-sm text-muted">
            Volg het studio op{" "}
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
              Bekijk projecten
            </ButtonLink>
            <ButtonLink href="/contact">Neem contact op</ButtonLink>
          </div>
        </div>
      </div>

      <p className="mt-16 text-center text-xs text-muted">
        Tip: vervang de beeldplaceholder op deze pagina door een professionele
        portretfoto.{" "}
        <Link href="/contact" className="underline-offset-2 hover:underline">
          Vraag desnoods raad bij je fotograaf.
        </Link>
      </p>
    </div>
  );
}
