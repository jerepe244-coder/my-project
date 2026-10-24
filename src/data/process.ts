import { ProcessStage } from '@/types';

export const processStages: ProcessStage[] = [
  {
    id: 'discovery',
    number: '01',
    name: {
      es: 'Discovery & Diagnóstico',
      en: 'Discovery & Diagnosis',
    },
    objective: {
      es: 'Comprender a fondo tu modelo de negocio, propuesta de valor, audiencia y metas comerciales prioritarias.',
      en: 'Thoroughly understand your business model, value proposition, audience, and commercial priorities.',
    },
    work: {
      es: 'Analizamos tu posición actual en el mercado, auditamos referencias, definimos los requisitos funcionales indispensables y establecemos los criterios de éxito.',
      en: 'We analyze current market positioning, review aesthetic references, specify functional requirements, and establish shared success criteria.',
    },
    deliverables: {
      es: [
        'Documento de alcance y requerimientos',
        'Definición de arquitectura de información',
        'Mapa de contenido y flujo de usuarios',
      ],
      en: [
        'Scope and requirements specification',
        'Information architecture blueprint',
        'Content mapping & key user flows',
      ],
    },
  },
  {
    id: 'direction',
    number: '02',
    name: {
      es: 'Dirección & Estructura',
      en: 'Direction & Structure',
    },
    objective: {
      es: 'Definir el rumbo visual, la jerarquía tipográfica y la estructura funcional antes de entrar a código.',
      en: 'Establish the visual direction, typographic hierarchy, and structural rhythm before development.',
    },
    work: {
      es: 'Exploramos el sistema de diseño, paleta de colores, tipografía, composición de pantallas clave y prototipado interactivo de componentes críticos.',
      en: 'We craft design tokens, typography, layout rhythm for core pages, and interactive low-fidelity interaction prototypes.',
    },
    deliverables: {
      es: [
        'Sistema visual y tokens tipográficos',
        'Maquetas interactivas de pantallas principales',
        'Alineación de dirección aprobada',
      ],
      en: [
        'Visual system and design tokens',
        'Interactive mockups of primary screens',
        'Approved aesthetic direction brief',
      ],
    },
  },
  {
    id: 'design-build',
    number: '03',
    name: {
      es: 'Diseño & Construcción',
      en: 'Design & Build',
    },
    objective: {
      es: 'Construir la experiencia web completa con código limpio, alta performance y atención al detalle.',
      en: 'Engineer the full digital experience with clean code, peak performance, and meticulous execution.',
    },
    work: {
      es: 'Desarrollamos la aplicación utilizando tecnologías modernas (Next.js, TypeScript), implementamos animaciones con sentido, responsive design e integraciones necesarias.',
      en: 'We code the application utilizing modern technologies (Next.js, TypeScript), implement purposeful animations, responsive grids, and API integrations.',
    },
    deliverables: {
      es: [
        'Código fuente estructurado y documentado',
        'Versiones optimizadas para móvil, tablet y escritorio',
        'Integración del formulario y servicios de contacto',
      ],
      en: [
        'Structured, maintainable source code',
        'Responsive layouts for mobile, tablet, and desktop',
        'Form integration and direct contact routing',
      ],
    },
  },
  {
    id: 'review-refine',
    number: '04',
    name: {
      es: 'Revisión & Refinamiento',
      en: 'Review & Refinement',
    },
    objective: {
      es: 'Validar minuciosamente cada interacción, texto, accesibilidad y rendimiento en un entorno de pruebas real.',
      en: 'Rigorously validate every interaction, copy, accessibility criterion, and performance score in staging.',
    },
    work: {
      es: 'Realizamos pruebas exhaustivas de navegación con teclado, validación de formularios, compatibilidad entre navegadores, auditorías de accesibilidad y pruebas en dispositivos reales.',
      en: 'We conduct comprehensive keyboard accessibility tests, form validation stress-tests, cross-browser audits, and real-device testing.',
    },
    deliverables: {
      es: [
        'Entorno de pre-visualización privada (staging)',
        'Reporte de accesibilidad y rendimiento',
        'Ajustes finales de pulido y compatibilidad',
      ],
      en: [
        'Private staging preview URL',
        'Accessibility & performance audit report',
        'Final micro-adjustments and compatibility polish',
      ],
    },
  },
  {
    id: 'launch-support',
    number: '05',
    name: {
      es: 'Lanzamiento & Soporte',
      en: 'Launch & Support',
    },
    objective: {
      es: 'Poner el sitio en producción con seguridad y asegurar su correcto funcionamiento posterior.',
      en: 'Deploy the website to production securely and safeguard ongoing stability.',
    },
    work: {
      es: 'Configuramos dominios, SSL, indexación SEO inicial, sitemaps y acompañamos durante los primeros días de operación para garantizar estabilidad absoluta.',
      en: 'We configure domains, SSL, technical SEO indexing, sitemaps, and monitor the initial deployment period for complete stability.',
    },
    deliverables: {
      es: [
        'Despliegue verificado en producción',
        'Verificación de metadatos y sitemap indexable',
        'Guía técnica de mantenimiento y soporte acordado',
      ],
      en: [
        'Verified production deployment',
        'Metadata and sitemap indexing verification',
        'Maintenance handover guide and ongoing support plan',
      ],
    },
  },
];
