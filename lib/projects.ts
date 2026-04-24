export type Project = {
  slug: string;
  title: string;
  location: string;
  type: string;
  year: string;
  excerpt: string;
  hero: string;
  gallery: string[];
  context: {
    challenge: string;
    approach: string;
    result: string;
  };
};

/** Placeholder beelden — vervang door eigen projectfotografie. */
const u = (id: string, sig?: string) =>
  `https://images.unsplash.com/${id}${sig ? `?${sig}` : ""}`;

export const projects: Project[] = [
  {
    slug: "woning-antwerpen",
    title: "Woning Antwerpen",
    location: "Antwerpen",
    type: "Volledige inrichting · woning",
    year: "2024",
    excerpt:
      "Renovatie met open leefruimte, warme materialen en ingetogen kleur.",
    hero: u("photo-1600607687939-ce8a6c25118c", "auto=format&fit=crop&w=2000&q=80"),
    gallery: [
      u("photo-1600607687939-ce8a6c25118c", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600585154526-990dced4db0d", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600210492486-724fe5c67fb0", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600566753086-00f18fb6b3ea", "auto=format&fit=crop&w=1600&q=80"),
    ],
    context: {
      challenge:
        "De woning voelde versnipperd: donkere doorgangen en weinig natuurlijk licht in de kern van het plan.",
      approach:
        "We openden de keuken naar de leefruimte, herwerkten de vloerlijn en koos een beperkt materiaalpalet met tactiele texturen.",
      result:
        "Eén rustige leefzone met zichtlijnen naar buiten — functioneel voor gezinsleven, kalm in uitstraling.",
    },
  },
  {
    slug: "appartement-gent",
    title: "Appartement Gent",
    location: "Gent",
    type: "Interieurconcept · appartement",
    year: "2023",
    excerpt: "Compact stadsappartement met maatwerk en slimme kastenwand.",
    hero: u("photo-1600585154340-be6161a56a0c", "auto=format&fit=crop&w=2000&q=80"),
    gallery: [
      u("photo-1600585154340-be6161a56a0c", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600573472550-8090b5e0745e", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600047509807-ba8f99d2cd3a", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600121848594-d8644e57abab", "auto=format&fit=crop&w=1600&q=80"),
    ],
    context: {
      challenge:
        "Beperkte oppervlakte en bestaande technische leidingen beperkten ingrepen in de structuur.",
      approach:
        "Ruimtelijk meubilair en één sterke materiaallijn (hout + minerale tint) om de diepte visueel te verlengen.",
      result:
        "Meer opbergruimte zonder visuele drukte; het appartement oogt groter en rustiger.",
    },
  },
  {
    slug: "strandhuis-nieuwpoort",
    title: "Strandhuis Nieuwpoort",
    location: "Nieuwpoort",
    type: "Renovatie · vakantiewoning",
    year: "2024",
    excerpt: "Licht interieur met robuuste afwerking tegen zand en vocht.",
    hero: u("photo-1600566753190-17f0baa2a6c3", "auto=format&fit=crop&w=2000&q=80"),
    gallery: [
      u("photo-1600566753190-17f0baa2a6c3", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600585152915-d0becacc9958", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600607687644-c7171b424da3", "auto=format&fit=crop&w=1600&q=80"),
      u("photo-1600585154363-67eb9e2d209c", "auto=format&fit=crop&w=1600&q=80"),
    ],
    context: {
      challenge:
        "Combinatie van onderhoudsgemak, sfeer en een omgeving met veel licht en reflectie op zee.",
      approach:
        "Duurzame, eenvoudig te reinigen materialen en zachte neutrals met één accent in textiel en kunst.",
      result:
        "Een tweede verblijf dat ontspannen aanvoelt — minder styling, meer leefcomfort het hele jaar door.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
