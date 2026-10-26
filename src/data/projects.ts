import { ProjectDetail } from '@/types';

export const projects: ProjectDetail[] = [
  {
    slug: 'aura-sanctuary',
    category: 'hospitality',
    categoryLabel: {
      es: 'Hospitalidad / Alojamiento Boutique',
      en: 'Hospitality / Boutique Retreat',
    },
    title: 'AURA Sanctuary',
    tagline: {
      es: 'Experiencia inmersiva de hospitalidad sensorial y descanso contemplativo.',
      en: 'Immersive sensory hospitality and contemplative retreat experience.',
    },
    isConcept: true,
    year: '2025',
    featured: true,
    coverImage: '/images/aura-cover.svg',
    galleryImages: [
      '/images/aura-cover.svg',
      '/images/aura-detail-1.svg',
      '/images/aura-detail-2.svg',
    ],
    clientContext: {
      es: 'Concepto desarrollado para un refugio boutique hipotético situado en un entorno natural andino. Busca desmarcarse de las plataformas de reserva impersonales, posicionando la exclusividad y el silencio como el principal lujo.',
      en: 'Concept developed for a hypothetical boutique alpine sanctuary. It diverges from impersonal booking portals by positioning exclusivity, materiality, and silence as prime luxury values.',
    },
    designGoal: {
      es: 'Transmitir calma inmediata mediante transiciones fluidas, tipografía refinada de escala contenida, paleta mineral y una experiencia de exploración de suites sin fricción.',
      en: 'Convey immediate tranquility through fluid transitions, refined restrained typography, mineral palette, and frictionless suite exploration.',
    },
    visualDecisions: [
      {
        es: 'Paleta mineral: tonos piedra volcánica, arena apagada y acentos de luz tenue.',
        en: 'Mineral palette: volcanic stone, muted sand, and low-contrast light accents.',
      },
      {
        es: 'Composición asimétrica: fotografía a sangre combinada con columnas de lectura editorial.',
        en: 'Asymmetric layout: full-bleed visual framing combined with editorial reading columns.',
      },
      {
        es: 'Detalles monocromáticos: microetiquetas y metadatos con espaciado técnico deliberado.',
        en: 'Monochrome detailing: technical micro-labels and deliberate tracking on metadata.',
      },
    ],
    interactions: [
      {
        es: 'Inspector interactivo de suites con cambio dinámico de especificaciones de habitación y planos de planta.',
        en: 'Interactive suite inspector with dynamic floor plans and room specification switching.',
      },
      {
        es: 'Simulador de solicitud de estadía con selección de fechas, cantidad de huéspedes y cálculo de estimación.',
        en: 'Stay inquiry simulator featuring date picking, guest selection, and estimate generation.',
      },
      {
        es: 'Transición cinemática de imágenes con suavizado visual optimizado para 60fps.',
        en: 'Cinematic image transitions with 60fps-optimized visual easing.',
      },
    ],
    features: [
      {
        es: 'Filtro por tipo de suite (Refugio Panorámico, Suite del Bosque, Cabaña Monolito).',
        en: 'Filter by suite type (Panoramic Shelter, Forest Suite, Monolith Cabin).',
      },
      {
        es: 'Módulo de experiencia gastronómica integrada y bienestar sensorial.',
        en: 'Integrated culinary journey and sensory wellness preview module.',
      },
      {
        es: 'Flujo de consulta directa para reservas privadas sin intermediación de comisiones.',
        en: 'Direct inquiry funnel engineered for private reservations without OTA commissions.',
      },
    ],
    potentialBenefits: [
      {
        es: 'Incremento proyectado de reservas directas frente a canales tradicionales mediante mayor conexión emocional.',
        en: 'Projected increase in direct booking ratio vs OTAs through elevated emotional resonance.',
      },
      {
        es: 'Aumento del ticket promedio percibido al comunicar la exclusividad y los servicios curados de la propiedad.',
        en: 'Higher perceived average stay value by emphasizing curation and private amenities.',
      },
    ],
    demoType: 'hospitality',
  },
  {
    slug: 'kon-atelier',
    category: 'gastronomy',
    categoryLabel: {
      es: 'Gastronomía / Atelier Culinario',
      en: 'Gastronomy / Culinary Atelier',
    },
    title: 'KÔN Atelier',
    tagline: {
      es: 'Cocina de estación y exploración botánica en formato editorial contemporáneo.',
      en: 'Seasonal kitchen and botanical exploration presented as a contemporary editorial digest.',
    },
    isConcept: true,
    year: '2025',
    featured: false,
    coverImage: '/images/kon-cover.svg',
    galleryImages: [
      '/images/kon-cover.svg',
      '/images/kon-detail-1.svg',
      '/images/kon-detail-2.svg',
    ],
    clientContext: {
      es: 'Concepto concebido para una propuesta gastronómica de autor que renueva su menú según ciclos de cosecha. El sitio web reemplaza las cartas en PDF con una experiencia viva e interactiva.',
      en: 'Concept created for an avant-garde seasonal dining room whose menu follows micro-harvest cycles. The site replaces static PDF menus with a live, curated digital experience.',
    },
    designGoal: {
      es: 'Elevar la comida a disciplina cultural mediante tipografía editorial cuidada, visualización de orígenes de ingredientes y una solicitud de mesa fluida y contextual.',
      en: 'Elevate culinary craft into a cultural discipline through refined editorial typography, ingredient provenance maps, and contextual table requests.',
    },
    visualDecisions: [
      {
        es: 'Fondo carbón profundo con acentos de bronce y blanco hueso para máxima legibilidad.',
        en: 'Deep charcoal background with bronze highlights and bone-white for readability.',
      },
      {
        es: 'Estructura de catálogo editorial con numeración técnica por pasos y maridaje sugerido.',
        en: 'Editorial catalog structure featuring course numbering and curated pairing suggestions.',
      },
      {
        es: 'Micro-animaciones de revelado que emulan la pausa y cadencia de una degustación formal.',
        en: 'Restrained reveal micro-animations reflecting the deliberate tempo of formal dining.',
      },
    ],
    interactions: [
      {
        es: 'Selector dinámico de menú degustación (7 pasos vs. 11 pasos) con alternador de maridaje de vinos naturales.',
        en: 'Dynamic tasting menu switcher (7 courses vs 11 courses) with natural wine pairing toggle.',
      },
      {
        es: 'Explorador interactivo de ingredientes con fichas de productores locales y notas de cata.',
        en: 'Interactive ingredient inspector showcasing local producers and tasting notes.',
      },
      {
        es: 'Simulador de solicitud de mesa con selección de turno, cantidad de comensales y restricciones dietéticas.',
        en: 'Table reservation simulator with seating selection, guest count, and dietary preferences.',
      },
    ],
    features: [
      {
        es: 'Filtro inteligente de alérgenos y preferencias dietarias en tiempo real.',
        en: 'Real-time intelligent allergen and dietary filter.',
      },
      {
        es: 'Acceso instantáneo a información de ubicación, política de puntualidad y código de vestimenta.',
        en: 'Instant access to location data, punctuality guidelines, and cellar notes.',
      },
      {
        es: 'Diseño ultra responsive adaptado a consulta rápida desde smartphones en mesa.',
        en: 'Ultra-responsive layout tailored for fast smartphone access in restaurant settings.',
      },
    ],
    potentialBenefits: [
      {
        es: 'Disminución del abandono al reservar al prescindir de interfaces de terceros frías o pesadas.',
        en: 'Lower reservation abandonment by eliminating heavy, disconnected third-party widgets.',
      },
      {
        es: 'Reducción de consultas manuales sobre alérgenos gracias a la claridad interactiva del menú.',
        en: 'Fewer manual guest inquiries regarding ingredients due to interactive clarity.',
      },
    ],
    demoType: 'gastronomy',
  },
  {
    slug: 'vectra-architects',
    category: 'architecture',
    categoryLabel: {
      es: 'Arquitectura / Práctica Espacial',
      en: 'Architecture / Spatial Practice',
    },
    title: 'VECTRA Architects',
    tagline: {
      es: 'Monolitos urbanos, geometría austera y precisión tectónica documentada.',
      en: 'Urban monoliths, austere geometry, and tectonic precision in a disciplined layout.',
    },
    isConcept: true,
    year: '2025',
    featured: false,
    coverImage: '/images/vectra-cover.svg',
    galleryImages: [
      '/images/vectra-cover.svg',
      '/images/vectra-detail-1.svg',
      '/images/vectra-detail-2.svg',
    ],
    clientContext: {
      es: 'Concepto formulado para un estudio de arquitectura y urbanismo contemporáneo. Necesita un portfolio que comunique rigor estructural, escala monumentaria y atención estricta a los materiales.',
      en: 'Concept formulated for a contemporary architecture and urban practice. Requires a digital platform communicating structural rigor, monumental scale, and strict material honesty.',
    },
    designGoal: {
      es: 'Tratar el espacio digital con el mismo rigor que una maqueta arquitectónica: retículas visibles, tipografía técnica monoespaciada para datos y planos interactivos de alta definición.',
      en: 'Treat digital space with the rigor of an architectural maquette: visible grid systems, technical mono fonts for metrics, and high-definition architectural drawings.',
    },
    visualDecisions: [
      {
        es: 'Retícula cartesiana sobria inspirada en planos constructivos alemanes y suizos.',
        en: 'Cartesian structural grid inspired by Swiss and German technical drafting standards.',
      },
      {
        es: 'Tipografía técnica en metadatos (superficie m², año, tipología estructural, latitud).',
        en: 'Technical mono typography for structural metadata (m² surface, year, structural typology, latitude).',
      },
      {
        es: 'Uso de contrastes de alta pureza entre grafito oscuro, líneas tenues y tipografía nítida.',
        en: 'High-purity contrast between graphite textures, subtle hairline frames, and crisp typography.',
      },
    ],
    interactions: [
      {
        es: 'Visor interactivo de planos con alternancia entre perspectiva volumétrica y sección técnica transversal.',
        en: 'Interactive blueprint visualizer toggling between volumetric views and technical cross-sections.',
      },
      {
        es: 'Explorador de materiales táctiles (hormigón visto, acero patinable, madera carbonizada).',
        en: 'Tactile material index explorer (exposed concrete, weathered steel, charred cedar).',
      },
      {
        es: 'Filtro por escala de obra (Residencial, Cultural, Pabellones urbanos).',
        en: 'Scale filter by project type (Residential, Cultural, Urban Pavilions).',
      },
    ],
    features: [
      {
        es: 'Módulo de especificaciones técnicas con descarga de ficha de proyecto de demostración.',
        en: 'Technical specification drawer with downloadable demo project spec sheet.',
      },
      {
        es: 'Navegación espacial por coordenadas y catálogo tipológico.',
        en: 'Spatial navigation indexed by coordinates and structural typology.',
      },
      {
        es: 'Carga progresiva optimizada para planimetrías vectoriales de alta precisión.',
        en: 'Progressive loading optimized for high-density vector architectural blueprints.',
      },
    ],
    potentialBenefits: [
      {
        es: 'Atracción de desarrolladores y comitentes internacionales que valoran la exactitud y el criterio sobrio.',
        en: 'Attract international developers and private clients who value precision and austere sobriety.',
      },
      {
        es: 'Diferenciación inmediata frente a portfolios tradicionales con galerías estáticas poco memorables.',
        en: 'Immediate differentiation against standard architectural portfolios with static sliders.',
      },
    ],
    demoType: 'architecture',
  },
  {
    slug: 'soma-formulations',
    category: 'ecommerce',
    categoryLabel: {
      es: 'Beauty & Commerce / Cuidado Celular',
      en: 'Beauty & Commerce / Cellular Care',
    },
    title: 'SŌMA Formulations',
    tagline: {
      es: 'Biotecnología botánica pura, rituales celulares y comercio digital sensorial de alta fidelidad.',
      en: 'Pure botanical biotechnology, cellular rituals, and high-fidelity sensory e-commerce.',
    },
    isConcept: true,
    year: '2025',
    featured: false,
    coverImage: '/images/soma-cover.webp',
    galleryImages: [
      '/images/soma-cover.webp',
      '/images/soma-detail-1.webp',
      '/images/soma-detail-2.webp',
    ],
    clientContext: {
      es: 'Concepto desarrollado para una marca de cosmética bioactiva y cuidado celular de autor. Busca trascender las tiendas online convencionales saturadas de pop-ups y agresividad promocional, creando un catálogo táctil de ritmo editorial con foco en ingredientes puros y formulación científica.',
      en: 'Concept engineered for an artisanal bioactive skincare and cellular formulation label. Diverges from cluttered, cookie-cutter online stores by offering a tactile editorial catalog focused on ingredient transparency and cosmetic biotechnology.',
    },
    designGoal: {
      es: 'Articular una experiencia de compra fluida y serena: tipografía de catálogo botánico, selector dinámico de variantes (volumen y envase recargable), visualización molecular de activos y microinteracciones de carrito en tiempo real.',
      en: 'Deliver a serene, tactile shopping flow: botanical apothecary typography, dynamic variant selection (volume and sustainable refills), molecular active breakdowns, and instantaneous cart microinteractions.',
    },
    visualDecisions: [
      {
        es: 'Paleta monocromática cálida: contrastes entre grafito profundo, ámbar botánico tenue y acentos minerales.',
        en: 'Warm monochrome palette: deep graphite foundations, muted botanical amber, and refined mineral accents.',
      },
      {
        es: 'Composición editorial de espécimen: fichas técnicas de laboratorio con coordenadas de cosecha y pureza molecular.',
        en: 'Editorial specimen composition: laboratory-grade specification sheets with harvest provenance and molecular purity.',
      },
      {
        es: 'Tipografía monoespaciada para datos bioactivos (% escualano, péptidos de cobre, lípidos botánicos).',
        en: 'Technical mono typography for bioactive parameters (% squalane, copper peptides, botanical lipids).',
      },
    ],
    interactions: [
      {
        es: 'Selector interactivo de variantes por volumen (30ml vs 50ml) y tipo de envase (vidrio biofotónico vs recarga sustentable).',
        en: 'Interactive variant selector by volume (30ml vs 50ml) and packaging type (biophotonic glass vs sustainable refill).',
      },
      {
        es: 'Explorador dinámico de fórmula botánica con desglose de principios activos, modo de aplicación y textura.',
        en: 'Dynamic botanical formula inspector with active ingredient breakdown, usage ritual, and sensorial texture preview.',
      },
      {
        es: 'Simulador funcional de carrito de compras en tiempo real con adición fluida, ajuste de cantidades y checkout sin cobro real.',
        en: 'Functional real-time cart simulator featuring seamless item additions, quantity management, and friction-free mock checkout.',
      },
    ],
    features: [
      {
        es: 'Catálogo reactivo con filtrado por necesidad cutánea (Regeneración, Barrera Lipídica, Hidratación Celular).',
        en: 'Reactive product catalog filterable by skin ritual (Cellular Regeneration, Lipid Barrier, Deep Hydration).',
      },
      {
        es: 'Cálculo de envíos sustentables neutros en carbono y empaque libre de plásticos en el drawer de compra.',
        en: 'Transparent carbon-neutral delivery estimate and plastic-free packaging guarantee inside the cart drawer.',
      },
      {
        es: 'Diseño responsive de extrema precisión táctil optimizado para navegación con una mano en smartphones.',
        en: 'Ergonomically tuned responsive touch targets designed for seamless one-handed mobile navigation.',
      },
    ],
    potentialBenefits: [
      {
        es: 'Aumento proyectado del ratio de conversión directa gracias a una experiencia de compra libre de fricción y distracciones.',
        en: 'Projected uplift in direct-to-consumer conversion via distraction-free checkout architecture.',
      },
      {
        es: 'Mayor fidelización de marca al elevar el desempaque digital al nivel de una boutique de cosmética de lujo.',
        en: 'Higher customer lifetime value by elevating digital discovery to the standard of an apothecary luxury atelier.',
      },
    ],
    demoType: 'ecommerce',
  },
];
