export interface MonolithProject {
  id: string;
  code: string;
  title: { es: string; en: string };
  category: 'residential' | 'cultural' | 'commercial';
  categoryLabel: { es: string; en: string };
  subtitle: { es: string; en: string };
  location: string;
  coordinates: string;
  elevation: string;
  year: string;
  area: string;
  primaryMaterial: { es: string; en: string };
  coverImage: string;
  detailImages: string[];
  concept: { es: string; en: string };
  spatialDecisions: {
    num: string;
    title: { es: string; en: string };
    desc: { es: string; en: string };
  }[];
  specifications: {
    label: { es: string; en: string };
    value: string;
  }[];
}

export interface MonolithMaterial {
  id: string;
  code: string;
  name: { es: string; en: string };
  category: { es: string; en: string };
  image: string;
  properties: {
    density: string;
    finish: { es: string; en: string };
    acoustic: string;
    sustainability: { es: string; en: string };
    thermal?: string;
  };
  tectonicNotes: { es: string; en: string };
}

export interface MonolithGalleryFrame {
  id: string;
  title: { es: string; en: string };
  location: string;
  subject: { es: string; en: string };
  image: string;
  aspect: 'wide' | 'tall' | 'square';
  meta: {
    focalLength: string;
    aperture: string;
    lightCondition: { es: string; en: string };
    orientation: string;
  };
}

export const MONOLITH_STUDIO_META = {
  name: 'MONOLITH',
  descriptor: {
    es: 'Estudio de Arquitectura Conceptual & Práctica Tectónica',
    en: 'Conceptual Architecture Practice & Tectonic Studio',
  },
  heroTitle: 'Spaces shaped by light.',
  heroTagline: {
    es: 'Volúmenes puros de hormigón visto, piedra caliza natural y madera carbonizada en comunión con el paisaje y la sombra.',
    en: 'Pure board-formed concrete volumes, natural limestone, and charred timber in communion with landscape and shadow.',
  },
  philosophyShort: {
    es: 'No añadimos formas innecesarias: sustraemos el ruido visual hasta que solo permanecen la luz, la masa mineral y la quietud del territorio. Cada proyecto es una pausa espacial duradera concebida para envejecer con dignidad geológica.',
    en: 'We do not add superfluous shapes: we subtract visual noise until only light, mineral mass, and the stillness of territory remain. Every project is an enduring spatial pause conceived to age with geological dignity.',
  },
  offices: [
    { city: 'Basel', address: 'St. Alban-Vorstadt 42, 4052 Basel, CH', coords: '47°33\'N 7°35\'E' },
    { city: 'Oslo', address: 'Dronning Eufemias gate 16, 0191 Oslo, NO', coords: '59°54\'N 10°45\'E' },
    { city: 'Patagonia', address: 'Valle Chacabuco, Aysén, CL', coords: '46°12\'S 72°05\'W' },
  ],
};

export const MONOLITH_PILLARS = [
  {
    number: '01',
    code: 'MAS // 01',
    title: { es: 'Masa Pura & Volumetría', en: 'Pure Mass & Geometry' },
    desc: {
      es: 'Volúmenes monolíticos continuos que expresan solidez tectónica. Los muros no son simples cerramientos, sino estratos minerales que esculpen el vacío interior.',
      en: 'Continuous monolithic volumes expressing tectonic permanence. Walls are not mere partitions, but mineral strata carving interior spatial voids.',
    },
    metric: '100% Structural Honesty',
  },
  {
    number: '02',
    code: 'LUX // 02',
    title: { es: 'Luz Rasante & Sombra', en: 'Raking Light & Shadow' },
    desc: {
      es: 'La luz cenital y las aperturas rasantes son nuestro material constructivo primario. La luz revela el grano del hormigón y la aspereza de la piedra a lo largo del ciclo solar.',
      en: 'Zenith apertures and raking fissures are our primary building material. Natural daylight reveals the concrete grain and limestone tooth as the sun traces its arc.',
    },
    metric: 'Solar Azimuth Calibration',
  },
  {
    number: '03',
    code: 'MAT // 03',
    title: { es: 'Honestidad de la Materia', en: 'Material Authenticity' },
    desc: {
      es: 'Hormigón con textura de encofrado de alerce, caliza abujardada a mano, madera quemada al fuego y acero oxidado sellado. Sin acabados sintéticos ni imposturas decorativas.',
      en: 'Board-formed larch concrete, hand bush-hammered limestone, flame-charred cedar, and beeswax-sealed steel. Zero synthetic veneers or decorative falsehoods.',
    },
    metric: 'Tactile Mineral Purity',
  },
  {
    number: '04',
    code: 'TER // 04',
    title: { es: 'Simbiosis Territorial', en: 'Landscape Symbiosis' },
    desc: {
      es: 'La arquitectura no conquista el paisaje ni compite con él. Emerge de la topografía como un afloramiento geológico natural que encuadra el horizonte y custodia el silencio.',
      en: 'Architecture neither conquers nor competes with landscape. It emerges from topography as a natural geological outcropping, framing horizons and guarding silence.',
    },
    metric: 'Topographic Integration',
  },
];

export const MONOLITH_PROJECTS: MonolithProject[] = [
  {
    id: 'casa-bruma',
    code: 'MN-01',
    title: { es: 'Casa Bruma', en: 'Bruma Residence' },
    category: 'residential',
    categoryLabel: { es: 'Residencial Unifamiliar', en: 'Single-Family Residential' },
    subtitle: {
      es: 'Residencia en voladizo sobre acantilado marino',
      en: 'Cantilevered residence on coastal granite cliff',
    },
    location: 'Patagonia Sur',
    coordinates: '49°18\'S · 73°02\'W',
    elevation: '+48 m s.n.m.',
    year: '2025',
    area: '580 m²',
    primaryMaterial: {
      es: 'Hormigón blanco visto & piedra caliza fósil',
      en: 'White board-formed concrete & fossil limestone',
    },
    coverImage: '/images/monolith-project-1.webp',
    detailImages: [
      '/images/monolith-hero.webp',
      '/images/monolith-interior-light.webp',
      '/images/monolith-detail-concrete.webp',
      '/images/monolith-staircase.webp',
    ],
    concept: {
      es: 'Un prisma pétreo de 34 metros de longitud que vuela 6 metros en voladizo sobre el rompiente de olas del Pacífico Sur. La vivienda se concibe como una grieta habitable: el viento costero resbala sobre su geometría de hormigón encofrado mientras el interior permanece en absoluto silencio térmico y acústico.',
      en: 'A 34-meter monolithic stone prism cantilevered 6 meters over the crashing surf of the South Pacific. Conceived as a habitable crevice: coastal gales glide smoothly across its board-formed concrete mass while the interior remains in profound thermal and acoustic stillness.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Voladizo este hacia el horizonte', en: 'Eastward cantilever over horizon' },
        desc: {
          es: 'La viga Vierendeel de hormigón armado permite suspender la estancia principal sobre el acantilado sin apoyos intermedios.',
          en: 'A structural reinforced concrete Vierendeel girder suspends the primary living pavilion over the drop without intermediate pillars.',
        },
      },
      {
        num: '02',
        title: { es: 'Lucernario cenital continuo de 18m', en: '18m continuous zenith light fissure' },
        desc: {
          es: 'Una incisión longitudinal en la cubierta baña el muro ciego posterior de hormigón con luz rasante durante todo el día.',
          en: 'A linear roof fissure floods the rear retaining concrete wall with raking sunlight through every hour of the daylight arc.',
        },
      },
      {
        num: '03',
        title: { es: 'Patio de abrigo sotaventado', en: 'Leeward sheltered microclimate patio' },
        desc: {
          es: 'Un patio interior excavado en el terreno genera un microclima protegido de las ráfagas marítimas con estanque de basalto.',
          en: 'A sunken courtyard excavated into granite creates an intimate microclimate shielded from maritime gusts with a basalt reflecting pool.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Hormigón armado visto monomaterial CON-C50' },
      { label: { es: 'Superficie útil', en: 'Usable floor area' }, value: '580 m² (440 m² cubiertos / 140 m² terrazas)' },
      { label: { es: 'Aislamiento térmico', en: 'Thermal envelope' }, value: 'U = 0.14 W/(m²K) estándar Passivhaus' },
      { label: { es: 'Acristalamiento', en: 'Glazing system' }, value: 'Triple vidrio laminado bajo emisivo Rw 49 dB' },
    ],
  },
  {
    id: 'atrio-mineral',
    code: 'MN-02',
    title: { es: 'Atrio Mineral', en: 'Mineral Atrium' },
    category: 'cultural',
    categoryLabel: { es: 'Espacio Cultural & Pabellón de Arte', en: 'Cultural Space & Art Pavilion' },
    subtitle: {
      es: 'Galería escultórica y atrio de luz cenital filtrada',
      en: 'Sculptural gallery and filtered zenith light atrium',
    },
    location: 'Kyoto Foothills',
    coordinates: '35°01\'N · 135°46\'E',
    elevation: '+210 m',
    year: '2024',
    area: '1,420 m²',
    primaryMaterial: {
      es: 'Piedra caliza abujardada & hormigón gris ceniza',
      en: 'Bush-hammered limestone & ash concrete',
    },
    coverImage: '/images/monolith-project-2.webp',
    detailImages: [
      '/images/monolith-staircase.webp',
      '/images/monolith-courtyard.webp',
      '/images/monolith-detail-stone.webp',
    ],
    concept: {
      es: 'Un espacio de contemplación artística tallado como una cantera a cielo abierto. Las obras escultóricas dialogan con muros ciegos de 9 metros de altura donde la luz solar ingresa exclusivamente desde perforaciones prismáticas calculadas en la cubierta.',
      en: 'A contemplative exhibition sanctuary sculpted like an open-air stone quarry. Sculptures converse with 9-meter blind walls where sunlight enters solely through precisely calibrated prism incisions in the ceiling.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Patios de sombra y resonancia', en: 'Shadow courtyards & acoustic voids' },
        desc: {
          es: 'Tres patios de planta cuadrada secuencian la transición entre el rumor exterior del bosque y la quietud de las salas.',
          en: 'Three square courtyards calibrate the contemplative threshold between external forest rustle and gallery stillness.',
        },
      },
      {
        num: '02',
        title: { es: 'Escalera monolítica suspendida', en: 'Suspended monolithic concrete stair' },
        desc: {
          es: 'Una escalera escultórica de hormigón masivo comunica los niveles sin rozar los muros perimetrales de piedra caliza.',
          en: 'A monumental sculptural concrete stair links gallery floors without touching the perimeter bush-hammered stone walls.',
        },
      },
      {
        num: '03',
        title: { es: 'Regulación de luz solar difusa', en: 'Calibrated diffuse daylight baffles' },
        desc: {
          es: 'Difusores de alabastro translúcido suavizan la radiación directa garantizando una conservación óptima de las obras expuestas.',
          en: 'Translucent alabaster baffles diffuse direct UV radiation to preserve delicate artworks under continuous neutral illumination.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Muros portantes de hormigón ciclópeo y forjado artesonado' },
      { label: { es: 'Capacidad de exhibición', en: 'Exhibition volume' }, value: '4 salas diáfanas de 11m de luz libre' },
      { label: { es: 'Control higrotérmico', en: 'Climate control' }, value: 'Geotermia de pozo profundo con inercia mineral pasiva' },
      { label: { es: 'Acabado de piso', en: 'Pavement finish' }, value: 'Losas de caliza de 120×120cm con junta continua de 2mm' },
    ],
  },
  {
    id: 'pabellon-fiordo',
    code: 'MN-03',
    title: { es: 'Pabellón del Fiordo', en: 'Fjord Pavilion' },
    category: 'commercial',
    categoryLabel: { es: 'Pabellón & Cava Geotérmica', en: 'Pavilion & Geothermal Cellar' },
    subtitle: {
      es: 'Volumen oscuro integrado en la orilla de granito nórdico',
      en: 'Dark volume integrated into Nordic granite water edge',
    },
    location: 'Hardangerfjord',
    coordinates: '60°23\'N · 6°15\'E',
    elevation: '+4 m',
    year: '2025',
    area: '430 m²',
    primaryMaterial: {
      es: 'Cedro quemado Shou Sugi Ban & hormigón antracita',
      en: 'Shou Sugi Ban charred cedar & anthracite concrete',
    },
    coverImage: '/images/monolith-project-3.webp',
    detailImages: [
      '/images/monolith-detail-wood.webp',
      '/images/monolith-gallery-4.webp',
      '/images/monolith-gallery-1.webp',
    ],
    concept: {
      es: 'Situado en la orilla del fiordo noruego, el pabellón combina un zócalo masivo de hormigón oscuro que soporta las mareas con una estructura superior de madera carbonizada al fuego según la técnica tradicional japonesa Shou Sugi Ban.',
      en: 'Perched on the waterline of a Norwegian fjord, the pavilion marries an unyielding tidal base of dark concrete with a flame-charred cedar superstructure preserved by traditional Shou Sugi Ban technique.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Zócalo mareal anclado al lecho rocoso', en: 'Tidal plinth anchored to bedrock' },
        desc: {
          es: 'El hormigón hidrófugo con puzolana resiste el agua salina helada y aloja la cava subterránea de temperatura estable (8°C).',
          en: 'Hydrophobic pozzolanic concrete withstands subzero salt water, housing a naturally stabilized 8°C geothermal tasting cellar.',
        },
      },
      {
        num: '02',
        title: { es: 'Galería perimetral en sombra profunda', en: 'Deep shadow perimeter loggia' },
        desc: {
          es: 'Aleros de 3.2m de vuelo protegen los ventanales de la nieve y crean una transición gradual hacia el paisaje helado.',
          en: 'Generous 3.2m cantilevers shelter panoramic glass from snow accumulation and cast deep calming shadows onto the water.',
        },
      },
      {
        num: '03',
        title: { es: 'Hogar central de hierro y piedra', en: 'Central hearth of blackened iron & stone' },
        desc: {
          es: 'Un monolito de fuego divide sutilmente el salón de cata privado de la biblioteca espacial sin tabiques divisorios.',
          en: 'A monolithic open hearth subtly separates the private tasting salon from the spatial library without interior partition walls.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Pilares de acero oxidado patinado y forjado de madera laminada' },
      { label: { es: 'Resistencia marina', en: 'Marine durability' }, value: 'Tratamiento hidrófugo de poro cerrado C5-M' },
      { label: { es: 'Climatización', en: 'HVAC strategy' }, value: 'Bomba de calor acoplada a circuito de agua del fiordo (COP 4.8)' },
      { label: { es: 'Aperturas', en: 'Openings' }, value: 'Puertas correderas monumentales de 4.8×3.2m en roble carbón' },
    ],
  },
  {
    id: 'casa-piedra-sombra',
    code: 'MN-04',
    title: { es: 'Casa de Piedra & Sombra', en: 'House of Stone & Shade' },
    category: 'residential',
    categoryLabel: { es: 'Residencia de Patio', en: 'Courtyard Residence' },
    subtitle: {
      es: 'Arquitectura vernácula y patios de inercia térmica en paisaje árido',
      en: 'Vernacular courtyard architecture with thermal mass in arid terrain',
    },
    location: 'Cabo de Gata',
    coordinates: '36°43\'N · 2°11\'W',
    elevation: '+115 m',
    year: '2024',
    area: '720 m²',
    primaryMaterial: {
      es: 'Bloques de caliza arenisca local & mortero de cal pura',
      en: 'Local quarry sandstone blocks & pure slaked lime wash',
    },
    coverImage: '/images/monolith-project-4.webp',
    detailImages: [
      '/images/monolith-courtyard.webp',
      '/images/monolith-detail-stone.webp',
      '/images/monolith-gallery-3.webp',
    ],
    concept: {
      es: 'En un entorno semidesértico azotado por el sol, la casa se repliega sobre tres patios interiores ajardinados con olivos centenarios y agua en reposo. Muros ciclópeos de 60 centímetros de espesor almacenan el frescor nocturno y lo liberan durante las horas diurnas.',
      en: 'In a sun-drenched semi-arid landscape, the house turns inward around three contemplative courtyards with ancient olive trees and still water mirrors. 60-centimeter cyclopean stone walls capture night coolness, releasing it slowly during sweltering days.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Muros de 60cm de inercia térmica', en: '60cm thermal mass cyclopean walls' },
        desc: {
          es: 'Construidos con piedra extraída en el mismo desmonte de la parcela, reduciendo la huella de transporte a cero.',
          en: 'Built with stone excavated directly from the plot topography, reducing transport carbon expenditure to zero.',
        },
      },
      {
        num: '02',
        title: { es: 'Torres de viento y ventilación cruzada', en: 'Wind catchers & cross-breeze shafts' },
        desc: {
          es: 'Conductos verticales inducen corrientes de aire fresco desde los estanques sombreados hacia las habitaciones superiores.',
          en: 'Vertical air catchers draw cool moist air across shaded water basins through the living quarters without mechanical energy.',
        },
      },
      {
        num: '03',
        title: { es: 'Pórticos con celosías de hormigón blanco', en: 'Colonnade with white concrete brise-soleil' },
        desc: {
          es: 'Geometrías de sombra calculadas para bloquear el sol alto de verano y permitir el ingreso del sol rasante de invierno.',
          en: 'Shadow geometries calibrated to block high summer sun while inviting low-angled winter sun deep into the living spaces.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Muros de carga de mampostería concertada y bóvedas rebajadas' },
      { label: { es: 'Huella hídrica', en: 'Water recycling' }, value: 'Aljibe pluvial subterráneo de 45.000 L para riego y climatización pasiva' },
      { label: { es: 'Consumo energético', en: 'Energy consumption' }, value: 'Edificio de energía positiva (ZEB certified)' },
      { label: { es: 'Carpintería', en: 'Joinery' }, value: 'Madera de castaño macizo al aceite vegetal' },
    ],
  },
  {
    id: 'centro-cultural-nomada',
    code: 'MN-05',
    title: { es: 'Centro Cultural Nómada', en: 'Nomad Cultural Center' },
    category: 'cultural',
    categoryLabel: { es: 'Mediateca & Archivo Alpino', en: 'Media Center & Alpine Archive' },
    subtitle: {
      es: 'Volúmenes minerales cortados contra la nieve alpina',
      en: 'Mineral volumes cut against alpine snow peaks',
    },
    location: 'Valais Alps',
    coordinates: '46°12\'N · 7°21\'E',
    elevation: '+1,820 m',
    year: '2025',
    area: '2,150 m²',
    primaryMaterial: {
      es: 'Hormigón blanco hidrófugo & vidrio triple bajo emisivo',
      en: 'Hydrophobic white concrete & low-e triple glazing',
    },
    coverImage: '/images/monolith-project-5.webp',
    detailImages: [
      '/images/monolith-gallery-2.webp',
      '/images/monolith-staircase.webp',
      '/images/monolith-interior-light.webp',
    ],
    concept: {
      es: 'Un complejo escultórico de tres monolitos facetados que emergen de la pendiente alpina. Alberga archivos manuscritos, salas de lectura silenciosa y un anfiteatro acústico tallado en el lecho de roca caliza.',
      en: 'A sculptural complex of three faceted monoliths rising from an alpine slope. Houses historic manuscripts, silent reading halls, and an acoustic amphitheater carved directly into limestone bedrock.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Facetado exterior deflector de nieve', en: 'Snow-shedding faceted geometry' },
        desc: {
          es: 'Las pendientes pronunciadas de la cubierta canalizan las sobrecargas de nieve invernal hacia gargantas naturales protegidas.',
          en: 'Steep roof facets guide severe winter snow loads safely into natural rocky defiles without mechanical de-icing.',
        },
      },
      {
        num: '02',
        title: { es: 'Atrio de lectura con luz septentrional', en: 'Reading atrium with steady northern light' },
        desc: {
          es: 'Grandes paños de vidrio orientados al norte proporcionan una iluminación uniforme ideal para la investigación sin deslumbramiento.',
          en: 'Monumental north-facing glass planes deliver shadowless, glare-free daylight engineered for prolonged literary study.',
        },
      },
      {
        num: '03',
        title: { es: 'Cámara acústica de roca viva', en: 'Living rock acoustic chamber' },
        desc: {
          es: 'El muro de contención posterior expone el estrato geológico original, aportando masa y absorción acústica reverberante.',
          en: 'The rear retaining wall exposes the natural stratified geological bed, providing monumental acoustic mass and resonance.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Cáscaras de hormigón autocompactante de alta resistencia C60' },
      { label: { es: 'Aislamiento sísmico', en: 'Seismic isolation' }, value: 'Apoyos elastoméricos multidireccionales sobre zapatas de roca' },
      { label: { es: 'Acústica interior', en: 'Interior acoustics' }, value: 'Tiempo de reverberación RT60 = 0.85s (estándar filarmónico)' },
      { label: { es: 'Revestimiento', en: 'Wall lining' }, value: 'Paneles de alerce alpino microperforado' },
    ],
  },
  {
    id: 'refugio-ceniza',
    code: 'MN-06',
    title: { es: 'Refugio de Ceniza', en: 'Ash Shelter' },
    category: 'residential',
    categoryLabel: { es: 'Refugio de Montaña', en: 'Mountain Forest Sanctuary' },
    subtitle: {
      es: 'Volumen compacto de hormigón ciclópeo y madera entre pinos',
      en: 'Compact cyclopean concrete & timber volume among pine forest',
    },
    location: 'Sierra de Gredos',
    coordinates: '40°15\'N · 5°18\'W',
    elevation: '+1,440 m',
    year: '2024',
    area: '310 m²',
    primaryMaterial: {
      es: 'Hormigón de árido grueso de granito & madera de roble quemado',
      en: 'Coarse granite aggregate concrete & charred oak',
    },
    coverImage: '/images/monolith-project-6.webp',
    detailImages: [
      '/images/monolith-gallery-4.webp',
      '/images/monolith-gallery-1.webp',
      '/images/monolith-detail-wood.webp',
    ],
    concept: {
      es: 'Un refugio forestal austero concebido para habitar el cambio estacional. El basamento de hormigón incorpora fragmentos de granito desprendidos de la ladera, anclando la casa visualmente a la geología circundante.',
      en: 'An austere forest sanctuary conceived for observing seasonal change. The concrete plinth embeds granite fragments found on the slope, fusing the dwelling visually to surrounding bedrock.',
    },
    spatialDecisions: [
      {
        num: '01',
        title: { es: 'Hogar monolítico como núcleo de gravedad', en: 'Monolithic hearth as central anchor' },
        desc: {
          es: 'La chimenea de hormigón visto actúa como elemento sustentante y distribuidor de calor por conducción hacia las estancias.',
          en: 'The exposed concrete hearth functions both as central load-bearing core and conductive thermal distributor.',
        },
      },
      {
        num: '02',
        title: { es: 'Plataforma flotante sobre el suelo vegetal', en: 'Elevated platform preserving forest floor' },
        desc: {
          es: 'La vivienda se eleva 60cm sobre el terreno mediante micropilotes puntuales, permitiendo el libre curso de las raíces de los pinos.',
          en: 'The structure hovers 60cm above ground on pinpoint micro-piles, allowing pine root networks and moisture to flow undisturbed.',
        },
      },
      {
        num: '03',
        title: { es: 'Carpinterías enrasadas de apertura total', en: 'Flush full-pocketing glass portals' },
        desc: {
          es: 'Las esquinas de vidrio se retraen completamente dentro de los muros ciegos, disolviendo el límite entre interior y bosque.',
          en: 'Mitered glass corners slide entirely into hidden wall pockets, dissolving boundaries between interior and wild pine canopy.',
        },
      },
    ],
    specifications: [
      { label: { es: 'Tipología estructural', en: 'Structural typology' }, value: 'Estructura mixta de madera contralaminada (CLT) y zócalo de hormigón' },
      { label: { es: 'Aislamiento ecológico', en: 'Natural insulation' }, value: 'Fibra de madera compactada de 200mm de espesor' },
      { label: { es: 'Huella de carbono', en: 'Carbon footprint' }, value: 'Carbono negativo (-34 tCO2e en ciclo de vida constructivo)' },
      { label: { es: 'Estufa de inercia', en: 'Thermal stove' }, value: 'Masa refractaria de esteatita finlandesa' },
    ],
  },
];

export const MONOLITH_MATERIALS: MonolithMaterial[] = [
  {
    id: 'concrete-board',
    code: 'CON-C50/60',
    name: {
      es: 'Hormigón Visto con Textura de Encofrado de Alerce',
      en: 'Board-Formed Architectural Larch Concrete',
    },
    category: { es: 'Estructural & Textura', en: 'Structural & Tectonics' },
    image: '/images/monolith-detail-concrete.webp',
    properties: {
      density: '2,420 kg/m³',
      finish: {
        es: 'Tablas de alerce siberiano cepilladas con veta viva, desencofrante vegetal e hidrófugo mineral mate',
        en: 'Rough-sawn Siberian larch timber formwork, natural bio-release agent, and matte mineral water-repellent',
      },
      acoustic: 'NRC 0.18 (Difusión superficial de alta frecuencia)',
      sustainability: {
        es: '45% escoria granulada de alto horno sustituyendo clínker; huella de carbono reducida en un 38%',
        en: '45% blast-furnace slag replacement of Portland clinker; embodied carbon reduced by 38%',
      },
      thermal: 'Inercia térmica pesada: calor específico c = 1,000 J/(kg·K)',
    },
    tectonicNotes: {
      es: 'Cada tongada de vertido deja una línea sutil de unión tectónica. Los orificios de los tensores cónicos se sellan con tapones de plomo artesanal enrasados a 4mm.',
      en: 'Each pour lift leaves a deliberate tectonic joint line. Conical tie-rod holes are sealed with hand-pressed lead plugs recessed precisely 4mm.',
    },
  },
  {
    id: 'limestone-bush',
    code: 'STN-LIM-04',
    name: {
      es: 'Piedra Caliza Fósil con Abujardado Manual',
      en: 'Bush-Hammered Natural Fossil Limestone',
    },
    category: { es: 'Revestimiento Mineral', en: 'Mineral Cladding' },
    image: '/images/monolith-detail-stone.webp',
    properties: {
      density: '2,680 kg/m³',
      finish: {
        es: 'Abujardado con martillo de cuatro puntas, microjunta perimetral de sombra de 8mm y sellado mate transpirable',
        en: 'Four-point bush-hammered surface tooth, 8mm recessed shadow joint, and breathable mineral siloxane impregnation',
      },
      acoustic: 'NRC 0.12 (Reflexión difusa controlada)',
      sustainability: {
        es: 'Extracción en cantera a cielo abierto con corte por hilo diamantado y circuito cerrado de agua al 100%',
        en: 'Open-pit extraction with diamond wire cutting and 100% closed-loop sedimentation water recycling',
      },
      thermal: 'Conductividad térmica λ = 1.65 W/(m·K)',
    },
    tectonicNotes: {
      es: 'Masa mineral sedimentaria con inclusiones de conchas marinas fósiles. Al recibir luz rasante lateral a 15°, proyecta micro-sombras que acentúan la tridimensionalidad del muro.',
      en: 'Sedimentary mineral mass with fossil inclusions. Under 15° lateral raking light, its micro-cavities cast sculptural relief shadows.',
    },
  },
  {
    id: 'charred-cedar',
    code: 'WOD-SSB-88',
    name: {
      es: 'Cedro Rojo Carbonizado (Técnica Shou Sugi Ban)',
      en: 'Shou Sugi Ban Charred Red Cedar',
    },
    category: { es: 'Protección Orgánica', en: 'Organic Protection' },
    image: '/images/monolith-detail-wood.webp',
    properties: {
      density: '540 kg/m³',
      finish: {
        es: 'Combustión controlada a 900°C creando una capa vítrea de carbón superficial, sellada con aceite de tung puro',
        en: 'Controlled 900°C flame exposure producing a vitrified protective carbon crust, stabilized with pure tung oil',
      },
      acoustic: 'NRC 0.35 (Absorción acústica natural en frecuencias medias)',
      sustainability: {
        es: 'Madera de talas selectivas con certificación FSC; tratamiento ignífugo y fungicida 100% libre de químicos sintéticos',
        en: 'FSC-certified selective forestry; natural flame retardancy and biocide-free insect immunity lasting >80 years',
      },
      thermal: 'Excelente aislante natural: λ = 0.11 W/(m·K)',
    },
    tectonicNotes: {
      es: 'La capa de carbón es inerte a los rayos UV, al fuego y a la humedad. Su tonalidad varía entre el negro ébano profundo y reflejos cobrizos bajo el sol directo.',
      en: 'The carbon crust is UV-immune and water-repellent. Its hue shifts between deep obsidian black and muted bronze sheen under direct sunlight.',
    },
  },
  {
    id: 'low-e-glass',
    code: 'GLS-TRIP-92',
    name: {
      es: 'Vidrio Laminado Acústico Triple Bajo Emisivo',
      en: 'Low-Iron Acoustic Triple Low-E Glazing',
    },
    category: { es: 'Membrana Lumínica', en: 'Daylight Membrane' },
    image: '/images/monolith-hero.webp',
    properties: {
      density: '2,500 kg/m³',
      finish: {
        es: 'Composición extraclara con bajo contenido en óxido de hierro (92% de transmisión lumínica) y doble capa magnetrónica',
        en: 'Low-iron composition with 92% visual transmission, neutral color rendition (Ra 98), and dual magnetron low-e coating',
      },
      acoustic: 'Rw 51 dB (Aislamiento acústico de máximo rango)',
      sustainability: {
        es: 'Valor U = 0.55 W/(m²K) estándar Passivhaus certificado; reduce pérdidas térmicas en un 72% frente al doble acristalamiento',
        en: 'U-value = 0.55 W/(m²K) Passivhaus certified; reduces envelope thermal transmission by 72% vs standard double glass',
      },
      thermal: 'Factor solar g = 0.42 (Control pasivo de sobrecalentamiento estival)',
    },
    tectonicNotes: {
      es: 'Perfilería de acero oculto integrada enrasada a piso y cielo raso. El vidrio desaparece visualmente, permitiendo una lectura ininterrumpida del paisaje.',
      en: 'Concealed steel sub-framing embedded flush into ceilings and stone floors. The boundary dissolves visually into landscape.',
    },
  },
];

export const MONOLITH_GALLERY: MonolithGalleryFrame[] = [
  {
    id: 'gal-01',
    title: { es: 'Residencia en Acantilado al Atardecer', en: 'Cliffside Monolith at Dusk' },
    location: 'Patagonia Sur',
    subject: { es: 'Volumetría exterior y linterna cálida sobre el océano', en: 'Exterior massing and warm interior lantern above ocean' },
    image: '/images/monolith-hero.webp',
    aspect: 'wide',
    meta: {
      focalLength: '35mm',
      aperture: 'f/5.6',
      lightCondition: { es: 'Luz crepuscular rasante (hora azul)', en: 'Low-angle blue hour twilight' },
      orientation: 'Azimut 245° SO',
    },
  },
  {
    id: 'gal-02',
    title: { es: 'Escalera Monumental en Hormigón', en: 'Monumental Concrete Staircase' },
    location: 'Kyoto Cultural Center',
    subject: { es: 'Geometría diagonal y proyección de sombras cenitales', en: 'Diagonal geometry and zenith shadow projection' },
    image: '/images/monolith-staircase.webp',
    aspect: 'tall',
    meta: {
      focalLength: '50mm',
      aperture: 'f/8.0',
      lightCondition: { es: 'Luz cenital directa de mediodía (12:30)', en: 'High noon zenith sunlight (12:30)' },
      orientation: 'Cenital 90°',
    },
  },
  {
    id: 'gal-03',
    title: { es: 'Atrio con Luz Rasante sobre Muro Entablillado', en: 'Atrium Raking Light on Board-Formed Wall' },
    location: 'Casa Bruma',
    subject: { es: 'Textura mineral revelada por el rayo solar matutino', en: 'Mineral texture illuminated by morning raking ray' },
    image: '/images/monolith-interior-light.webp',
    aspect: 'wide',
    meta: {
      focalLength: '24mm',
      aperture: 'f/4.0',
      lightCondition: { es: 'Luz rasante matinal a 18° de elevación solar', en: 'Morning raking light at 18° solar altitude' },
      orientation: 'Azimut 085° E',
    },
  },
  {
    id: 'gal-04',
    title: { es: 'Patio Mineral con Olivo Escultórico', en: 'Mineral Courtyard with Solitary Olive Tree' },
    location: 'Casa de Piedra & Sombra',
    subject: { es: 'Piedra caliza, banco pétreo y silencio arquitectónico', en: 'Limestone walls, stone bench and architectural silence' },
    image: '/images/monolith-courtyard.webp',
    aspect: 'square',
    meta: {
      focalLength: '45mm',
      aperture: 'f/6.3',
      lightCondition: { es: 'Luz difusa de media tarde', en: 'Mid-afternoon diffuse ambient sky' },
      orientation: 'Patio interior protegido',
    },
  },
  {
    id: 'gal-05',
    title: { es: 'Perspectiva Crepuscular en Terraza de Hormigón', en: 'Twilight Terrace in Raw Concrete' },
    location: 'Pabellón del Fiordo',
    subject: { es: 'Reflejo de luz interior cálida sobre la piedra húmeda', en: 'Warm interior illumination reflecting on wet stone' },
    image: '/images/monolith-gallery-1.webp',
    aspect: 'wide',
    meta: {
      focalLength: '28mm',
      aperture: 'f/2.8',
      lightCondition: { es: 'Atardecer nórdico dorado', en: 'Golden hour Nordic sunset' },
      orientation: 'Azimut 270° O',
    },
  },
  {
    id: 'gal-06',
    title: { es: 'Columnata Monumental & Ritmo Estructural', en: 'Structural Colonnade & Shadow Rhythm' },
    location: 'Centro Cultural Nómada',
    subject: { es: 'Pilares monolíticos de hormigón y fuga geométrica', en: 'Monolithic concrete pillars and vanishing point' },
    image: '/images/monolith-gallery-2.webp',
    aspect: 'tall',
    meta: {
      focalLength: '70mm',
      aperture: 'f/8.0',
      lightCondition: { es: 'Sol cenital de alto contraste', en: 'High contrast architectural daylight' },
      orientation: 'Eje longitudinal N-S',
    },
  },
  {
    id: 'gal-07',
    title: { es: 'Cámara de Baño en Bloque de Caliza', en: 'Stone Bath Chamber with Hidden Skylight' },
    location: 'Casa Bruma',
    subject: { es: 'Bañera monolítica tallada en piedra con lucernario oculto', en: 'Monolithic limestone carved tub with concealed aperture' },
    image: '/images/monolith-gallery-3.webp',
    aspect: 'tall',
    meta: {
      focalLength: '35mm',
      aperture: 'f/4.0',
      lightCondition: { es: 'Luz cenital suave filtrada por celosía', en: 'Soft filtered overhead light well' },
      orientation: 'Luz cenital indirecta',
    },
  },
  {
    id: 'gal-08',
    title: { es: 'Pabellón Fundido en la Topografía Agreste', en: 'Pavilion Integrated in Mountain Topography' },
    location: 'Refugio de Ceniza',
    subject: { es: 'Cubierta vegetal, hormigón oscuro y bosque de coníferas', en: 'Green roof, dark concrete and conifer canopy' },
    image: '/images/monolith-gallery-4.webp',
    aspect: 'wide',
    meta: {
      focalLength: '50mm',
      aperture: 'f/5.6',
      lightCondition: { es: 'Luz clara de montaña tras la lluvia', en: 'Crisp mountain daylight after precipitation' },
      orientation: 'Orientación Sur',
    },
  },
];
