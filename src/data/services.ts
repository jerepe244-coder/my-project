import { ServiceItem } from '@/types';

export const services: ServiceItem[] = [
  {
    id: 'web-design',
    number: '01',
    title: {
      es: 'Diseño Web & Dirección de Arte',
      en: 'Web Design & Art Direction',
    },
    description: {
      es: 'Diseño de experiencias digitales distintivas que expresan la identidad de tu marca, organizan la información de manera estratégica y facilitan una navegación memorable.',
      en: 'Design of distinctive digital experiences that embody your brand identity, structure information strategically, and deliver memorable navigation.',
    },
    tags: [
      { es: 'Sistemas visuales', en: 'Visual systems' },
      { es: 'Tipografía editorial', en: 'Editorial typography' },
      { es: 'Arquitectura de información', en: 'Information architecture' },
      { es: 'Prototipado interactivo', en: 'Interactive prototyping' },
    ],
  },
  {
    id: 'web-development',
    number: '02',
    title: {
      es: 'Desarrollo Web & Ingeniería Frontend',
      en: 'Web Development & Frontend Engineering',
    },
    description: {
      es: 'Construcción de sitios web rápidos, completamente responsive, accesibles y técnicamente sólidos, adaptados a los requerimientos específicos de cada proyecto.',
      en: 'Engineering fast, responsive, accessible, and resilient websites tailored precisely to project performance and commercial requirements.',
    },
    tags: [
      { es: 'Next.js & TypeScript', en: 'Next.js & TypeScript' },
      { es: 'Accesibilidad (WCAG)', en: 'Accessibility (WCAG)' },
      { es: 'Microinteracciones', en: 'Micro-interactions' },
      { es: 'Rendimiento y Core Web Vitals', en: 'Core Web Vitals & speed' },
    ],
  },
  {
    id: 'custom-experiences',
    number: '03',
    title: {
      es: 'Experiencias Digitales Personalizadas',
      en: 'Custom Digital Experiences',
    },
    description: {
      es: 'Funcionalidades a medida, transiciones refinadas y flujos de usuario concebidos para negocios que necesitan ir más allá de los estándares convencionales.',
      en: 'Bespoke functionality, curated transitions, and custom user flows engineered for brands requiring more than off-the-shelf conventions.',
    },
    tags: [
      { es: 'Configuradores & simuladores', en: 'Simulators & estimators' },
      { es: 'Demos interactivas', en: 'Interactive product demos' },
      { es: 'Flujos progresivos', en: 'Progressive flows' },
      { es: 'Animación con intención', en: 'Purposeful motion' },
    ],
  },
  {
    id: 'integrations-optimization',
    number: '04',
    title: {
      es: 'Integración & Optimización Técnica',
      en: 'Integrations & Technical Optimization',
    },
    description: {
      es: 'Conexión con sistemas de gestión, pasarelas, automatizaciones de correo y optimización profunda de velocidad y posicionamiento técnico de sitios existentes.',
      en: 'Integration with CRMs, email services, APIs, alongside deep performance optimization and technical SEO for existing digital assets.',
    },
    tags: [
      { es: 'APIs & Webhooks', en: 'APIs & Webhooks' },
      { es: 'SEO técnico & metadatos', en: 'Technical SEO' },
      { es: 'Automatización de briefs', en: 'Workflow automation' },
      { es: 'Auditorías de rendimiento', en: 'Performance audits' },
    ],
  },
  {
    id: 'ongoing-support',
    number: '05',
    title: {
      es: 'Mantenimiento & Soporte Continuo',
      en: 'Ongoing Support & Site Evolution',
    },
    description: {
      es: 'Acompañamiento técnico posterior al lanzamiento para conservar la seguridad, velocidad, compatibilidad y evolución continua del sitio web.',
      en: 'Post-launch technical guardianship ensuring your website maintains optimal security, speed, compatibility, and deliberate evolution.',
    },
    tags: [
      { es: 'Monitoreo de uptime', en: 'Uptime monitoring' },
      { es: 'Actualizaciones técnicas', en: 'Technical updates' },
      { es: 'Soporte prioritario', en: 'Direct support' },
      { es: 'Evolución de contenidos', en: 'Content evolution' },
    ],
  },
];
