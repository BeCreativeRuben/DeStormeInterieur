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

/** Encode alleen het bestandsdeel zodat spaties in publieke paden correct werken. */
function p(path: string): string {
  const i = path.lastIndexOf("/");
  return path.slice(0, i + 1) + encodeURIComponent(path.slice(i + 1));
}

export const projects: Project[] = [
  {
    slug: "maatwerk-bureau",
    title: "Maatwerk Bureau",
    location: "Belgie",
    type: "Maatwerk - bureau",
    year: "2026",
    excerpt:
      "Een rustige werkplek met voldoende opbergruimte, zonder visuele drukte.",
    hero: p("/projects/bureau2/Scene 4.png"),
    gallery: [
      p("/projects/bureau2/Scene 4.png"),
      p("/projects/bureau2/Image 1.png"),
      p("/projects/bureau2/Image_2.png"),
      p("/projects/bureau2/Image_3.png"),
      p("/projects/bureau2/Scene 5.png"),
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
    hero: p("/projects/batoo2/finalScene 1.png"),
    gallery: [
      p("/projects/batoo2/finalScene 1.png"),
      p("/projects/batoo2/finalScene 2.png"),
      p("/projects/batoo2/finalScene 3.png"),
      p("/projects/batoo2/finalScene 4.png"),
      p("/projects/batoo2/finalScene 5.png"),
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
    hero: p("/projects/zolder2/bob_zolder_2Scene 1_1 2.png"),
    gallery: [
      p("/projects/zolder2/bob_zolder_2Scene 1_1 2.png"),
      p("/projects/zolder2/bob_zolder_2Scene 2_1 2.png"),
      p("/projects/zolder2/bob_zolder_2Scene 4_1 2.png"),
      p("/projects/zolder2/bob_zolder_2Scene 7_1 2.png"),
      p("/projects/zolder2/bob_zolder_2Scene 8_1 2.png"),
      p("/projects/zolder2/bob_zolder_2Scene 10_1 3.png"),
      p("/projects/zolder2/bob_zolder_2Scene 11_1 4.png"),
      p("/projects/zolder2/bob_zolder_2Image_1 4.png"),
      p("/projects/zolder2/bob_zolder_2Image_2 1.png"),
      p("/projects/zolder2/bob_zolder_2Image_3 2.png"),
      p("/projects/zolder2/bob_zolder_2Image_4 2.png"),
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
    hero: p("/projects/badkamer2/Scene 3.png"),
    gallery: [
      p("/projects/badkamer2/Scene 1.png"),
      p("/projects/badkamer2/Scene 2.png"),
      p("/projects/badkamer2/Scene 4 2.png"),
      p("/projects/badkamer2/Scene 5_1.png"),
      p("/projects/badkamer2/Scene 6_1.png"),
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
