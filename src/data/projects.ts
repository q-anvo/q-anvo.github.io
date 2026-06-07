export interface Project {
  id:    string;
  title: string;
  fr:    string;
  en:    string;
  tags:  string[];
  img:   string;
  url?:  string;
  host?: string;
}

export const PROJECTS: Project[] = [
  {
    id:    'joanails',
    title: 'Joanails',
    fr:    'Site qui génère des réservations en ligne',
    en:    'Website that drives online bookings',
    tags:  ['Site web'],
    img:   '/assets/joanails.png',
    url:   'https://joanails.fr',
    host:  'joanails.fr',
  },
  {
    id:    'erp-metier',
    title: 'ERP & Applications Métier',
    fr:    'Développement d\'ERP et d\'outils sur mesure : planification d\'équipes, gestion des devis, réservations 24h/24 et pilotage complet de l\'activité — des solutions pensées pour centraliser, automatiser et donner de la visibilité à chaque étape du business.',
    en:    'Custom ERP and business app development: team scheduling, quote management, 24/7 bookings and full operations control — built to centralise, automate and provide visibility across every step of the business.',
    tags:  ['Application métier'],
    img:   '/assets/erp-schema.jpg',
  },
  {
    id:    'data-platform',
    title: 'Plateforme Data',
    fr:    'Pipeline de données fiable pour des décisions basées sur les faits',
    en:    'Reliable data pipeline for evidence-based decisions',
    tags:  ['IoT & Data'],
    img:   '/assets/etl.png',
    host:  'data.studio',
  },
  {
    id:    'mobilite',
    title: 'Applications mobilité',
    fr:    'Interface fluide pour les déplacements du quotidien',
    en:    'Smooth digital experience for everyday urban mobility',
    tags:  ['Application métier'],
    img:   '/assets/smart-city.png',
    host:  'smart-city.app',
  },
  {
    id:    'iot-elevage',
    title: 'Supervision IoT',
    fr:    'Supervision en temps réel et alertes proactives pour les pros du terrain',
    en:    'Real-time supervision and proactive alerts for field professionals',
    tags:  ['IoT & Data'],
    img:   '/assets/medria.webp',
  },
];

export const PROJECT_TAGS = ['Tous', 'Site web', 'Application métier', 'IoT & Data'] as const;
export type ProjectTag = typeof PROJECT_TAGS[number];
