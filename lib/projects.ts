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
  collaboration?: string;
};

export const projects: Project[] = [
  {
    slug: "maatwerk-bureau",
    title: "Maatwerk Bureau",
    location: "Belgie",
    type: "Maatwerk - bureau",
    year: "2026",
    excerpt:
      "Een rustige werkplek met voldoende opbergruimte, zonder visuele drukte.",
    hero: "/projects/bureau/hero.png",
    gallery: [
      "/projects/bureau/hero.png",
      "/projects/bureau/02.png",
      "/projects/bureau/03.png",
      "/projects/bureau/04.png",
      "/projects/bureau/05.png",
      "/projects/bureau/06.png",
    ],
    context: {
      challenge:
        "De vraag was een rustige werkplek met voldoende opbergruimte, zonder visuele drukte.",
      approach:
        "We ontwierpen een maatwerk bureau geintegreerd in een wand van donkere fineer, gecombineerd met een natuursteen blad voor contrast en tactiliteit.",
      result:
        "Open nissen en indirecte verlichting brengen ritme en diepte in het geheel, terwijl de gesloten kasten zorgen voor rust en orde. Een compacte maar doordachte werkruimte: functioneel in gebruik en rustig in uitstraling.",
    },
  },
  {
    slug: "opfrissing-batoo-kuurne",
    title: "Opfrissing Batoo Kuurne",
    location: "Kuurne",
    type: "Opfrissing - hospitality",
    year: "2026",
    excerpt:
      "Een nieuwe zitzone die sfeer en privacy brengt zonder de ruimte af te sluiten.",
    hero: "/projects/batoo/hero.png",
    gallery: [
      "/projects/batoo/hero.png",
      "/projects/batoo/01.png",
      "/projects/batoo/02.png",
      "/projects/batoo/05.png",
    ],
    context: {
      challenge:
        "Voor Batoo in Kuurne werd een nieuwe zitzone ontworpen die zowel sfeer als privacy brengt binnen de ruimte.",
      approach:
        "Centraal staat een doorlopende maatwerk zitbank, gecombineerd met een roomdivider in touwen, als subtiele verwijzing naar het karakter van de zaak.",
      result:
        "De ingreep structureert de ruimte zonder ze af te sluiten: open waar nodig, intiem waar gewenst. Warme houttinten, zachte stoffering en geintegreerde beplanting versterken de gezellige, ontspannen sfeer.",
    },
    collaboration: "Ontwerp gerealiseerd in samenwerking met schrijnwerker BOB.",
  },
  {
    slug: "zolderrenovatie",
    title: "Zolderrenovatie",
    location: "Belgie",
    type: "Renovatie - zolder",
    year: "2026",
    excerpt:
      "Een rustige multifunctionele zolder met maatwerk op maat van het schuine dak.",
    hero: "/projects/zolder/05.png",
    gallery: [
      "/projects/zolder/05.png",
      "/projects/zolder/10.png",
      "/projects/zolder/06.png",
      "/projects/zolder/03.png",
      "/projects/zolder/07.png",
      "/projects/zolder/04.png",
    ],
    context: {
      challenge:
        "Voor deze zolderruimte werd een functioneel en rustig geheel ontworpen, afgestemd op meerdere gebruiksscenario's.",
      approach:
        "Door maatwerk kasten te integreren in de schuine dakvlakken wordt de beschikbare ruimte maximaal benut, zonder visuele drukte te creeren. De ruimte combineert een werkzone voor twee personen, opbergruimte en een compacte fitnesshoek.",
      result:
        "Warme houtaccenten en zachte, neutrale tinten zorgen voor een gebalanceerde en aangename sfeer onder het dak.",
    },
    collaboration: "Ontwerp gerealiseerd in samenwerking met schrijnwerker BOB.",
  },
  {
    slug: "renovatie-badkamer",
    title: "Renovatie Badkamer",
    location: "Harelbeke",
    type: "Renovatie - badkamer",
    year: "2026",
    excerpt:
      "Een tijdloze badkamer met ton-sur-ton kleuren en maatwerk in compacte ruimte.",
    hero: "/projects/badkamer/new-03.png",
    gallery: [
      "/projects/badkamer/new-03.png",
      "/projects/badkamer/new-01.png",
      "/projects/badkamer/new-02.png",
      "/projects/badkamer/new-06.png",
      "/projects/badkamer/new-04.png",
      "/projects/badkamer/new-05.png",
    ],
    context: {
      challenge:
        "Voor deze badkamer werd gezocht naar een rustige en tijdloze inrichting binnen een compacte ruimte.",
      approach:
        "We werkten met een licht, ton-sur-ton kleurenpalet in combinatie met warme houtaccenten om sfeer en zachtheid te creeren. De inloopdouche met glaswand houdt de ruimte visueel open, terwijl het maatwerk meubel zorgt voor voldoende opbergruimte zonder zwaar te ogen.",
      result:
        "Indirecte verlichting en geintegreerde spiegelkasten versterken het gevoel van rust en gebruiksgemak.",
    },
    collaboration: "Ontwerp uitgewerkt in samenwerking met Projectplan C.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
