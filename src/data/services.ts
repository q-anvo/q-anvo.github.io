export interface Service {
  icon: string;
  fr: { title: string; tagline: string; desc: string };
  en: { title: string; tagline: string; desc: string };
}

export const SERVICES: Service[] = [
  {
    icon: '◈',
    fr: {
      title:   'Applications web sur mesure',
      tagline: "De l'idée à la mise en ligne.",
      desc:    "Architecture propre, code testé, déploiement soigné. Du brief à la mise en production sans sous-traitance.",
    },
    en: {
      title:   'Custom web applications',
      tagline: 'From idea to launch.',
      desc:    'Clean architecture, tested code, careful deployment. From brief to production with no subcontracting.',
    },
  },
  {
    icon: '◉',
    fr: {
      title:   'Sites vitrines & SEO',
      tagline: 'Rapide, référencé, efficace.',
      desc:    "Performance, SEO technique, conversion. Un site qui travaille pour vous — pas l'inverse.",
    },
    en: {
      title:   'Showcase websites & SEO',
      tagline: 'Fast, ranked, effective.',
      desc:    'Performance, technical SEO, conversion. A site that works for you — not the other way around.',
    },
  },
  {
    icon: '◐',
    fr: {
      title:   'Conseil & audit technique',
      tagline: "Le regard extérieur qu'il vous faut.",
      desc:    "J'analyse ce qui bloque — stack, architecture, dette technique — et livre un plan d'action concret.",
    },
    en: {
      title:   'Technical consulting & audit',
      tagline: 'The outside perspective you need.',
      desc:    "I diagnose what's blocking — stack, architecture, tech debt — and deliver a concrete action plan.",
    },
  },
];
