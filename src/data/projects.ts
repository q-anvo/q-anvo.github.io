export interface Project {
  id:    string;
  title: string;
  fr:    string;
  en:    string;
  tags:  string[];
  img:   string;
  url?:  string;
}

export const PROJECTS: Project[] = [
  {
    id:    'joanails',
    title: 'Joanails',
    fr:    "Site vitrine salon d'ongles",
    en:    'Nail salon showcase website',
    tags:  ['Site web'],
    img:   '/assets/joanails.png',
    url:   'https://joanails.fr',
  },
  {
    id:    'planif-rh',
    title: 'Planification RH',
    fr:    'Application de planification intelligente des équipes',
    en:    'Smart workforce scheduling application',
    tags:  ['Application métier'],
    img:   '/assets/happyplan1.png',
  },
  {
    id:    'iot-elevage',
    title: 'Gestion IoT',
    fr:    "Plateforme de suivi connecté pour professionnels",
    en:    'Connected monitoring platform for professionals',
    tags:  ['IoT & Data'],
    img:   '/assets/medria.webp',
  },
  {
    id:    'erp-metier',
    title: 'ERP Métier',
    fr:    'Solution B2B de gestion pour PME',
    en:    'B2B management suite for SMBs',
    tags:  ['Application métier'],
    img:   '/assets/obbo.jpeg',
  },
  {
    id:    'booking',
    title: 'Plateforme de réservation',
    fr:    'Réservation en ligne et gestion des disponibilités',
    en:    'Online booking and availability management',
    tags:  ['Application métier'],
    img:   '/assets/bng.png',
  },
  {
    id:    'data-platform',
    title: 'Plateforme Data',
    fr:    "Outil d'analyse et de traitement de données pour chercheurs",
    en:    'Data analysis and processing tool for researchers',
    tags:  ['IoT & Data'],
    img:   '/assets/etl.png',
  },
  {
    id:    'mobilite',
    title: 'Applications mobilité',
    fr:    'Services numériques pour la mobilité urbaine',
    en:    'Digital services for urban mobility',
    tags:  ['Application métier'],
    img:   '/assets/smart-city.png',
  },
  {
    id:    'devis',
    title: 'Outil de devis',
    fr:    'Générateur de devis et suivi client',
    en:    'Quote generator and client tracking',
    tags:  ['Application métier'],
    img:   '/assets/devis-obbo.jpeg',
  },
];

export const PROJECT_TAGS = ['Tous', 'Site web', 'Application métier', 'IoT & Data'] as const;
export type ProjectTag = typeof PROJECT_TAGS[number];
