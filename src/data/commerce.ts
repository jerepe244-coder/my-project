export interface SomaProduct {
  id: string;
  code: string;
  title: { es: string; en: string };
  category: 'serums' | 'balms' | 'mists' | 'eye' | 'cleansers';
  categoryLabel: { es: string; en: string };
  tagline: { es: string; en: string };
  description: { es: string; en: string };
  basePrice: number;
  sizes: string[];
  sizeDelta: Record<string, number>;
  vessels: {
    id: 'glass' | 'refill';
    name: { es: string; en: string };
    delta: number;
    description: { es: string; en: string };
  }[];
  images: {
    primary: string;
    secondary: string;
    texture?: string;
  };
  actives: {
    name: string;
    concentration: string;
    function: { es: string; en: string };
  }[];
  sensory: {
    texture: { es: string; en: string };
    aroma: { es: string; en: string };
    finish: { es: string; en: string };
    origin: { es: string; en: string };
  };
  usage: { es: string; en: string };
}

export interface SomaCartItem {
  id: string;
  productId: string;
  title: { es: string; en: string };
  categoryLabel: { es: string; en: string };
  size: string;
  vesselId: 'glass' | 'refill';
  vesselName: { es: string; en: string };
  unitPrice: number;
  quantity: number;
  image: string;
}

export const SOMA_PRODUCTS: SomaProduct[] = [
  {
    id: 'soma-01',
    code: 'FORM-01/REG',
    title: {
      es: 'Néctar Celular Regenerativo',
      en: 'Regenerative Cellular Nectar',
    },
    category: 'serums',
    categoryLabel: {
      es: 'Suero Bioactivo Reparador',
      en: 'Bioactive Repair Serum',
    },
    tagline: {
      es: 'Matriz de fitopéptidos concentrados, escualano botánico puro y resina silvestre de mirra.',
      en: 'Concentrated phyto-peptide matrix, pure olive squalane, and wild harvested myrrh resin.',
    },
    description: {
      es: 'Tratamiento celular intensivo formulado para acelerar la regeneración nocturna de la epidermis. Los tripéptidos de origen botánico estimulan la síntesis de colágeno natural mientras el escualano de oliva pura restaura la barrera hidrolipídica sin oclusión.',
      en: 'Intensive cellular treatment engineered to accelerate nocturnal epidermal repair. Botanical tri-peptides stimulate endogenous collagen synthesis while pure olive squalane seals moisture without pore clogging.',
    },
    basePrice: 78,
    sizes: ['30ml', '50ml'],
    sizeDelta: { '30ml': 0, '50ml': 26 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Vidrio Biofotónico Miron (30ml/50ml)', en: 'Miron Biophotonic Glass (30ml/50ml)' },
        delta: 0,
        description: {
          es: 'Frasco violeta profundo que filtra el espectro solar destructivo y preserva la bioactividad',
          en: 'Deep violet glass blocking destructive light spectrum to preserve bioactive integrity',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Sobre 100% compostable derivado de almidón de maíz; reduce la huella de empaque en un 82%',
          en: '100% cornstarch-derived compostable pouch reducing packaging footprint by 82%',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-01.webp',
      secondary: '/images/soma-01-glass.webp',
      texture: '/images/soma-lifestyle-ritual.webp',
    },
    actives: [
      { name: 'Phyto-Peptide Tri-Complex', concentration: '4.8%', function: { es: 'Estimulación de síntesis de colágeno', en: 'Collagen & elastin matrix stimulation' } },
      { name: 'Olive Squalane (ECOCERT)', concentration: '100% Pure', function: { es: 'Emoliente biomimético no comedogénico', en: 'Biomimetic non-comedogenic lipid repair' } },
      { name: 'Wild Commiphora Myrrha', concentration: 'Trace Terpenes', function: { es: 'Poder antioxidante y calmante celular', en: 'Cellular antioxidant & soothing resin' } },
    ],
    sensory: {
      texture: { es: 'Aceite seco sedoso de absorción inmediata', en: 'Silky fast-absorbing dry lipid oil' },
      aroma: { es: 'Corteza de cedro, resina ahumada e higo verde', en: 'Cedar bark, smoked amber & crushed fig leaf' },
      finish: { es: 'Piel aterciopelada con luminosidad mineral natural', en: 'Velvety finish with subtle mineral radiance' },
      origin: { es: 'Recolección silvestre en micro-parcelas andinas', en: 'Wild harvesting in high-altitude Andean plots' },
    },
    usage: {
      es: 'Aplicar 4 a 6 gotas sobre el rostro y cuello limpios al anochecer, presionando suavemente con las palmas.',
      en: 'Press 4 to 6 drops into freshly cleansed face and neck at dusk, warming gently between palms.',
    },
  },
  {
    id: 'soma-02',
    code: 'FORM-02/LIP',
    title: {
      es: 'Bálsamo Barrera Lipídica',
      en: 'Lipid Barrier Botanical Balm',
    },
    category: 'balms',
    categoryLabel: {
      es: 'Cuidado Reparador de Barrera',
      en: 'Barrier Restoration Balm',
    },
    tagline: {
      es: 'Tres ceramidas de origen vegetal, lípido de semilla de lino salvaje y bisabolol orgánico.',
      en: 'Three bio-fermented plant ceramides, wild flaxseed lipid, and organic alpha-bisabolol.',
    },
    description: {
      es: 'Una emulsión densa y calmante que repara la barrera cutánea agredida por el estrés térmico y la polución urbana. Refuerza el estrato córneo con un perfil lipídico idéntico al de la piel sana.',
      en: 'A rich, restorative emulsion designed to repair barrier compromise caused by thermal stress and environmental friction. Replenishes the stratum corneum with a lipid ratio mimicking healthy skin.',
    },
    basePrice: 64,
    sizes: ['30ml', '50ml'],
    sizeDelta: { '30ml': 0, '50ml': 22 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Tarro Biofotónico de Vidrio Miron', en: 'Miron Biophotonic Glass Apothecary Jar' },
        delta: 0,
        description: {
          es: 'Vidrio apotecario de boca ancha con tapa sellada al vacío',
          en: 'Wide-mouth apothecary violet jar with airtight sealing inner lid',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Relleno ecológico para reponer directamente en tu tarro de vidrio biofotónico existente',
          en: 'Eco pouch designed for clean replenishment directly into your existing violet jar',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-02.webp',
      secondary: '/images/soma-02-glass.webp',
      texture: '/images/soma-vessel-miron.webp',
    },
    actives: [
      { name: 'Ceramide Complex (NP, AP, EOP)', concentration: '3.2%', function: { es: 'Restauración del cemento intercelular', en: 'Intercellular lipid mantle repair' } },
      { name: 'Wild Cold-Pressed Flaxseed Oil', concentration: 'Cold Pressed', function: { es: 'Aporte de ácidos grasos Omega 3-6-9', en: 'Omega 3-6-9 anti-inflammatory nutrition' } },
      { name: 'Organic Alpha-Bisabolol', concentration: '1.0% Pure', function: { es: 'Alivio de rojeces y sensibilidad reactiva', en: 'Redness reduction and sensitivity relief' } },
    ],
    sensory: {
      texture: { es: 'Emulsión densa fundente al calor de la piel', en: 'Rich balm melting instantly upon contact' },
      aroma: { es: 'Manzanilla silvestre, avena y paja tostada', en: 'Wild chamomile, sweet oat & sun-dried hay' },
      finish: { es: 'Nutrición profunda sin residuo graso pegajoso', en: 'Deep cushion nourishment without sticky residue' },
      origin: { es: 'Prensado artesanal en Bariloche, Patagonia', en: 'Artisanal cold pressing in Bariloche, Patagonia' },
    },
    usage: {
      es: 'Calentar una avellana entre los dedos y masajear con movimientos ascendentes en mejillas y frente.',
      en: 'Warm a pea-sized amount between fingertips and massage upward across cheeks and forehead.',
    },
  },
  {
    id: 'soma-03',
    code: 'FORM-03/HYD',
    title: {
      es: 'Bruma Biofotónica Esencial',
      en: 'Biophotonic Essence Mist',
    },
    category: 'mists',
    categoryLabel: {
      es: 'Tónico Celular Micro-Activado',
      en: 'Micro-Activated Cellular Mist',
    },
    tagline: {
      es: 'Hidrolato de rosas silvestres, ácido poliglutámico marino y electrolitos de flor de sal.',
      en: 'Wild damask rose hydrosol, marine polyglutamic acid, and sea salt mineral electrolytes.',
    },
    description: {
      es: 'Infusión botánica micro-pulverizada que satura la piel de hidratación molecular profunda. El ácido poliglutámico retiene hasta 5 veces más agua que el ácido hialurónico tradicional.',
      en: 'A micro-dispersed botanical water that saturates cellular layers with prolonged moisture. Polyglutamic acid holds up to 5 times more water than standard hyaluronic acid.',
    },
    basePrice: 52,
    sizes: ['50ml', '100ml'],
    sizeDelta: { '50ml': 0, '100ml': 28 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Botella de Vidrio Miron con Micro-Atomizador', en: 'Miron Violet Glass with Micro-Mist Atomizer' },
        delta: 0,
        description: {
          es: 'Cabezal pulverizador de precisión que emite partículas ultrafinas en nube',
          en: 'Precision engineered nozzle releasing an ultra-fine weightless mist cloud',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Sobre de recarga líquida hermético de vertido fácil sin derrames',
          en: 'Spouted compostable refill pouch engineered for mess-free bottle topping',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-03.webp',
      secondary: '/images/soma-03-glass.webp',
      texture: '/images/soma-botanical-lab.webp',
    },
    actives: [
      { name: 'Marine Polyglutamic Acid', concentration: '1.5%', function: { es: 'Retención hídrica de amplio espectro', en: 'Ultra-retentive hydration network' } },
      { name: 'Steam-Distilled Damask Rose Water', concentration: '92% Active Base', function: { es: 'Equilibrio de pH y tonificación celular', en: 'pH calibration & botanical toning' } },
      { name: 'Deep Ocean Electrolyte Complex', concentration: 'Natural Trace', function: { es: 'Mineralización osmótica dérmica', en: 'Cellular osmotic equilibrium' } },
    ],
    sensory: {
      texture: { es: 'Rocío etéreo impalpable de absorción instantánea', en: 'Weightless micro-cloud instantly absorbed' },
      aroma: { es: 'Pétalo fresco, rocío matinal y mineralidad marina', en: 'Dewy rose petals, green stem & ocean breeze' },
      finish: { es: 'Frescura inmediata y superficie receptiva al suero', en: 'Immediate quenching, primes skin for serums' },
      origin: { es: 'Destilación por arrastre de vapor en Valle de Uco', en: 'Steam distillation in Uco Valley, Argentina' },
    },
    usage: {
      es: 'Vaporizar a 20cm del rostro sobre la piel limpia antes de aplicar el néctar o para revitalizar durante el día.',
      en: 'Mist 20cm away over clean skin before serum application, or throughout the day for hydration refresh.',
    },
  },
  {
    id: 'soma-04',
    code: 'FORM-04/EYE',
    title: {
      es: 'Elixir Celular Contorno de Ojos',
      en: 'Phyto-Peptide Eye Contour Elixir',
    },
    category: 'eye',
    categoryLabel: {
      es: 'Cuidado Orbital & Anti-Fatiga',
      en: 'Orbital Restorative Elixir',
    },
    tagline: {
      es: 'Cafeína verde silvestre, tetrapéptido descongestivo y aceite de rosa mosqueta prensado en frío.',
      en: 'Wild green coffee caffeine, draining tetrapeptide, and cold-pressed organic rosehip seed oil.',
    },
    description: {
      es: 'Formulación de precisión para la fina piel del contorno periocular. Drena la congestión matutina, atenúa las sombras violáceas y suaviza las líneas de expresión con lípidos botánicos ultraligeros.',
      en: 'Precision targeted formula for the delicate peri-orbital area. Drains morning puffiness, brightens blue-undertone dark circles, and softens fine expression lines with featherlight botanical lipids.',
    },
    basePrice: 68,
    sizes: ['15ml', '30ml'],
    sizeDelta: { '15ml': 0, '30ml': 34 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Vial de Vidrio Miron con Aplicador Frío', en: 'Miron Violet Glass with Cryo-Tip Applicator' },
        delta: 0,
        description: {
          es: 'Gotero dosificador de gota exacta en vidrio biofotónico sellado',
          en: 'Exact-dose micro-pipette bottle in biophotonic ultraviolet glass',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Recarga dosificada para mantener la frescura activa sin generar residuos de vidrio',
          en: 'Measured refill pouch designed to preserve freshness with zero glass waste',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-04.webp',
      secondary: '/images/soma-01-glass.webp',
      texture: '/images/soma-lifestyle-ritual.webp',
    },
    actives: [
      { name: 'Green Coffee Botanical Caffeine', concentration: '3.0%', function: { es: 'Microcirculación y drenaje linfático', en: 'Lymphatic drainage & microcirculation' } },
      { name: 'Acetyl Tetrapeptide-5', concentration: '2.5%', function: { es: 'Descongestión orbital de bolsas y ojeras', en: 'Peri-orbital puffiness de-swelling' } },
      { name: 'Patagonian Rosehip Virgin Oil', concentration: 'Cold Pressed', function: { es: 'Aporte de ácido trans-retinoico natural', en: 'Natural trans-retinoic pro-vitamin A' } },
    ],
    sensory: {
      texture: { es: 'Fluido sedoso ultraligero que no migra hacia los ojos', en: 'Ultra-lightweight fluid that never migrates into eyes' },
      aroma: { es: 'Neutro con sutil matiz vegetal de grano verde', en: 'Unscented with faint raw botanical undertone' },
      finish: { es: 'Tensa suavemente e ilumina la mirada al instante', en: 'Instantly smooths, lifts, and illuminates gaze' },
      origin: { es: 'Cultivado en valles cordilleranos patagónicos', en: 'Cultivated in pristine Patagonian valleys' },
    },
    usage: {
      es: 'Dosificar 1 sola gota en el dedo anular y dar suaves toques en el hueso orbital de adentro hacia afuera.',
      en: 'Dispense 1 single drop onto ring finger and tap gently along orbital bone from inner to outer corner.',
    },
  },
  {
    id: 'soma-05',
    code: 'FORM-05/CLN',
    title: {
      es: 'Emulsión Limpiadora Adaptogénica',
      en: 'Adaptogenic Cleansing Emulsion',
    },
    category: 'cleansers',
    categoryLabel: {
      es: 'Limpieza Botánica & Rebalanceo',
      en: 'Botanical Cleanser & Rebalancing',
    },
    tagline: {
      es: 'Extracto de hongos reishi andinos, aceite de jojoba dorada y saponinas vegetales biodegradables.',
      en: 'Wild reishi mushroom extract, golden desert jojoba, and gentle plant saponins.',
    },
    description: {
      es: 'Bálsamo limpiador transformable de aceite a leche emulsionada. Disuelve impurezas, filtros solares y maquillaje resistente al agua sin alterar el microbioma ni la barrera ácida de la piel.',
      en: 'An oil-to-milk transformational cleansing emulsion. Melts away daily impurities, mineral sunscreen, and water-resistant makeup without disrupting the acid mantle or cutaneous microbiome.',
    },
    basePrice: 48,
    sizes: ['100ml', '200ml'],
    sizeDelta: { '100ml': 0, '200ml': 26 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Botella de Vidrio Miron con Bomba Bloqueable', en: 'Miron Violet Glass with Locking Treatment Pump' },
        delta: 0,
        description: {
          es: 'Frasco de gran formato con dispensador higiénico sin contacto con el aire',
          en: 'Heavyweight violet bottle with hygienic zero-air-exposure pump mechanism',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Bolsa de recarga de 200ml con cierre hermético compostable',
          en: '200ml bulk refill pouch with compostable hermetic seal',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-05.webp',
      secondary: '/images/soma-02-glass.webp',
      texture: '/images/soma-botanical-lab.webp',
    },
    actives: [
      { name: 'Wild Reishi Adaptogenic Extract', concentration: '2.0%', function: { es: 'Defensa antiestrés oxidativo e inflamatorio', en: 'Anti-inflammatory environmental defense' } },
      { name: 'Unrefined Golden Jojoba Ester', concentration: 'Cold Pressed', function: { es: 'Disolución de sebo oxidado afín a la piel', en: 'Skin-identical sebum dissolution' } },
      { name: 'Yucca Root Saponins', concentration: 'Gentle Surfactant', function: { es: 'Limpieza profunda biodegradable sin sulfatos', en: 'Sulfate-free biodegradable deep cleansing' } },
    ],
    sensory: {
      texture: { es: 'Aceite denso que se transforma en leche sedosa con agua', en: 'Silky oil transforming to milky emulsion with water' },
      aroma: { es: 'Tierra húmeda, cáscara de bergamota y vetiver silvestre', en: 'Damp earth, bergamot peel & wild vetiver root' },
      finish: { es: 'Piel limpia, flexible y libre de sensación de tirantez', en: 'Thoroughly purified, supple, zero tight sensation' },
      origin: { es: 'Cosecha botánica en bosques húmedos australes', en: 'Sustainable foraging in southern rainforests' },
    },
    usage: {
      es: 'Masajear sobre rostro seco durante 60 segundos. Agregar unas gotas de agua tibia para emulsionar y enjuagar.',
      en: 'Massage over dry skin for 60 seconds. Add warm water droplets to emulsify into milky veil, then rinse.',
    },
  },
  {
    id: 'soma-06',
    code: 'FORM-06/NIT',
    title: {
      es: 'Infusión Nocturna Bio-Retinol',
      en: 'Bio-Retinol Night Infusion',
    },
    category: 'serums',
    categoryLabel: {
      es: 'Renovación Celular Nocturna',
      en: 'Nocturnal Cellular Renewal',
    },
    tagline: {
      es: 'Bakuchiol puro al 2%, microalgas azules del pacífico y lípido de semilla de higo chumbo.',
      en: 'Pure 2% bakuchiol, Pacific blue microalgae, and prickly pear seed lipid.',
    },
    description: {
      es: 'Alternativa botánica biocompatible al retinol convencional. Estimula la renovación celular, disminuye la hiperpigmentación y afina la textura dérmica sin irritación, fotosensibilidad ni descamación.',
      en: 'A bio-compatible plant alternative to synthetic retinoids. Accelerates cellular turnover, fades uneven pigment, and refines dermal texture with zero irritation, redness, or photosensitivity.',
    },
    basePrice: 86,
    sizes: ['30ml', '50ml'],
    sizeDelta: { '30ml': 0, '50ml': 32 },
    vessels: [
      {
        id: 'glass',
        name: { es: 'Frasco de Vidrio Miron con Gotero Biofotónico', en: 'Miron Violet Glass with Biophotonic Dropper' },
        delta: 0,
        description: {
          es: 'Gotero graduado que preserva la pureza fotosensible del bakuchiol',
          en: 'Calibrated glass dropper protecting light-sensitive active bakuchiol',
        },
      },
      {
        id: 'refill',
        name: { es: 'Recarga Eco-Pouch Compostable (-$8)', en: 'Compostable Eco-Pouch Refill (-$8)' },
        delta: -8,
        description: {
          es: 'Envase de reposición biodegradable con barrera de protección UV',
          en: 'Biodegradable replenishment envelope with inner UV barrier',
        },
      },
    ],
    images: {
      primary: '/images/soma-product-06.webp',
      secondary: '/images/soma-01-glass.webp',
      texture: '/images/soma-lifestyle-ritual.webp',
    },
    actives: [
      { name: 'Sytenol® A Pure Bakuchiol', concentration: '2.0% Active', function: { es: 'Renovación de elastina y renovación dérmica', en: 'Retinol-like cellular regeneration' } },
      { name: 'Prickly Pear Seed Virgin Oil', concentration: 'Cold Pressed', function: { es: 'Aporte de esteroles y vitamina K antioxidante', en: 'High-potency plant sterols & Vitamin K' } },
      { name: 'Pacific Blue Cyanobacteria', concentration: '1.2%', function: { es: 'Protección contra la luz azul y estrés ambiental', en: 'HEV blue-light & oxidative stress shielding' } },
    ],
    sensory: {
      texture: { es: 'Néctar dorado de textura aterciopelada', en: 'Golden nectar with rich cushion glide' },
      aroma: { es: 'Mirra botánica, flor de loto azul y sándalo', en: 'Botanical myrrh, blue lotus & warm sandalwood' },
      finish: { es: 'Tacto sedoso que nutre profundamente durante el sueño', en: 'Silken veil that feeds skin through sleep cycle' },
      origin: { es: 'Extracción botánica en laboratorio de bio-cultivo', en: 'Clean laboratory botanical bio-culture' },
    },
    usage: {
      es: 'Aplicar 3 a 5 gotas por la noche sobre la piel limpia después de la bruma esencial, antes de la crema de noche.',
      en: 'Press 3 to 5 drops at night over cleansed skin after essence mist, before night balm.',
    },
  },
];

export const SOMA_STUDIO_META = {
  name: 'SŌMA FORMULATIONS',
  tagline: {
    es: 'Biotecnología celular botánica, rituales puros y comercio digital de alta fidelidad.',
    en: 'Pure botanical biotechnology, cellular rituals, and high-fidelity sensory e-commerce.',
  },
  mission: {
    es: 'Formulamos en la intersección de la bioquímica molecular y la sabiduría botánica ancestral. Cada fórmula se envasa en vidrio biofotónico Miron para preservar su energía vital sin aditivos sintéticos.',
    en: 'We formulate at the convergence of molecular biochemistry and ancestral plant wisdom. Every formula is preserved in Miron biophotonic glass to guard vital potency without synthetic additives.',
  },
  pillars: [
    {
      code: 'BIO // 01',
      title: { es: 'Bio-Fermentación Pura', en: 'Clean Bio-Fermentation' },
      desc: {
        es: 'Activos botánicos optimizados mediante fermentación celular para máxima biodisponibilidad transdérmica.',
        en: 'Botanical actives optimized through cellular fermentation for maximum transdermal bioavailability.',
      },
    },
    {
      code: 'MIR // 02',
      title: { es: 'Vidrio Biofotónico Miron', en: 'Miron Violet Glass' },
      desc: {
        es: 'Bloquea el 100% de la luz visible perjudicial y permite el paso de rayos UVA y luz violeta preservadora.',
        en: 'Blocks 100% of destructive visible light while admitting rejuvenating UVA and infrared violet rays.',
      },
    },
    {
      code: 'REF // 03',
      title: { es: 'Sistema Circular de Recargas', en: 'Circular Refill System' },
      desc: {
        es: 'Sobres compostables que reducen el uso de vidrio y plástico en un 82% con descuento de $8 USD por producto.',
        en: 'Compostable refills cutting packaging carbon emissions by 82% with an ongoing $8 USD discount.',
      },
    },
    {
      code: 'ETH // 04',
      title: { es: 'Cosecha Andina Silvestre', en: 'Wild Andean Foraging' },
      desc: {
        es: 'Extracción manual respetuosa en comunidades recolectoras con compensación de comercio justo.',
        en: 'Ethical manual harvesting in mountain communities backed by verified fair-trade compensation.',
      },
    },
  ],
};
