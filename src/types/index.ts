export type Language = 'es' | 'en';

export type Theme = 'dark' | 'light';

export type ProjectCategory = 'all' | 'hospitality' | 'gastronomy' | 'architecture' | 'ecommerce';

export interface ProjectDetail {
  slug: string;
  category: 'hospitality' | 'gastronomy' | 'architecture' | 'ecommerce';
  categoryLabel: { es: string; en: string };
  title: string;
  tagline: { es: string; en: string };
  isConcept: true;
  year: string;
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  clientContext: { es: string; en: string };
  designGoal: { es: string; en: string };
  visualDecisions: { es: string; en: string }[];
  interactions: { es: string; en: string }[];
  features: { es: string; en: string }[];
  potentialBenefits: { es: string; en: string }[];
  demoType: 'hospitality' | 'gastronomy' | 'architecture' | 'ecommerce';
}

export interface ServiceItem {
  id: string;
  number: string;
  title: { es: string; en: string };
  description: { es: string; en: string };
  tags: { es: string; en: string }[];
}

export interface ProcessStage {
  id: string;
  number: string;
  name: { es: string; en: string };
  objective: { es: string; en: string };
  work: { es: string; en: string };
  deliverables: { es: string[]; en: string[] };
}

export interface FAQItem {
  id: string;
  question: { es: string; en: string };
  answer: { es: string; en: string };
}
