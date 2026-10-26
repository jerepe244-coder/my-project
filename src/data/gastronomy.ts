export interface DishItem {
  id: string;
  num: string;
  category: 'openings' | 'water' | 'hearth' | 'pasture' | 'closing';
  title: { es: string; en: string };
  desc: { es: string; en: string };
  provenance: { es: string; en: string };
  pairing: { es: string; en: string };
  price: number;
  dietary: ('plant-forward' | 'pescatarian' | 'gluten-free')[];
  image?: string;
  isSignature?: boolean;
}

export interface AmbienceSpace {
  id: string;
  num: string;
  title: { es: string; en: string };
  subtitle: { es: string; en: string };
  desc: { es: string; en: string };
  specs: { es: string; en: string };
  image: string;
}

export interface TableZone {
  id: string;
  name: { es: string; en: string };
  capacity: { es: string; en: string };
  atmosphere: { es: string; en: string };
}

export const KON_CATEGORIES = [
  { id: 'all', label: { es: 'Todo el Menú', en: 'All Menu' } },
  { id: 'openings', label: { es: '01 // Aperturas Botánicas', en: '01 // Botanical Openings' } },
  { id: 'water', label: { es: '02 // De Aguas & Lagos', en: '02 // Waters & Lakes' } },
  { id: 'hearth', label: { es: '03 // Del Fuego & la Huerta', en: '03 // Hearth & Soil' } },
  { id: 'pasture', label: { es: '04 // De Pastura & Valle', en: '04 // Pasture & Valley' } },
  { id: 'closing', label: { es: '05 // Postres & Cierre', en: '05 // Desserts & Closing' } },
] as const;

export const KON_DISHES: DishItem[] = [
  {
    id: 'larch-consomme',
    num: '01',
    category: 'openings',
    title: {
      es: 'Infusión de Agujas de Alerce y Consomé Frío',
      en: 'Larch Needle Infusion & Chilled Consommé',
    },
    desc: {
      es: 'Extracto de brotes tiernos de alerce, baya de enebro silvestre y gotas de aceite de hojas de higuera.',
      en: 'Young larch pine shoots, wild mountain juniper berries, and cold-pressed fig leaf droplets.',
    },
    provenance: {
      es: 'Bosque nativo de altura · 1,500 m',
      en: 'High-altitude native forest · 1,500 m',
    },
    pairing: {
      es: 'Sidra salvaje de fermentación espontánea en ánfora (Valle de Uco 2022)',
      en: 'Wild Fermented Amphora Cider (Uco Valley 2022)',
    },
    price: 22,
    dietary: ['plant-forward', 'gluten-free'],
    image: '/images/kon-botanical-pantry.webp',
  },
  {
    id: 'salt-beetroot',
    num: '02',
    category: 'openings',
    title: {
      es: 'Remolacha Amarilla en Cenizas de Quebracho',
      en: 'Charcoal-Buried Yellow Beetroot',
    },
    desc: {
      es: 'Cocción lenta bajo rescoldo volcánico, crema agria vegetal de almendras tostadas y polvo de sauco silvestre.',
      en: 'Slow-baked under volcanic embers, toasted almond plant sour cream, and wild elderberry ash.',
    },
    provenance: {
      es: 'Huerta agroecológica del valle · Cosecha matinal',
      en: 'Valley agroecological garden · Morning micro-harvest',
    },
    pairing: {
      es: 'Pet-Nat de Criolla Chica Ancestral 2023 (Altamira)',
      en: 'Heritage Pet-Nat Criolla Chica 2023 (Altamira)',
    },
    price: 24,
    dietary: ['plant-forward', 'gluten-free'],
  },
  {
    id: 'lake-trout',
    num: '03',
    category: 'water',
    title: {
      es: 'Trucha de Deshielo Curada en Frío y Ovas de Río',
      en: 'Cold-Smoked Lake Trout & Cured River Roe',
    },
    desc: {
      es: 'Trucha arcoíris curada con sal marina fósil, dashi translúcido de hongos de pino y brotes de marisma costera.',
      en: 'Rainbow trout cured in mineral salt, crystal-clear pine mushroom dashi broth, and coastal kelp shoots.',
    },
    provenance: {
      es: 'Aguas glaciares del Lago Nahuel Huapi',
      en: 'Glacial waters of Lake Nahuel Huapi',
    },
    pairing: {
      es: 'Savagnin Ouillé 2021 (Crianza biológica bajo velo de flor)',
      en: 'Savagnin Ouillé 2021 (Biological aging under flor veil)',
    },
    price: 36,
    dietary: ['pescatarian', 'gluten-free'],
    image: '/images/kon-dish-trout.webp',
    isSignature: true,
  },
  {
    id: 'deep-prawn',
    num: '04',
    category: 'water',
    title: {
      es: 'Langostino Salvaje al Soplete de Resina de Pino',
      en: 'Torched Wild Langoustine with Pine Resin Glaze',
    },
    desc: {
      es: 'Atemperado con grasa de trucha ahumada, emulsión tibia de flores de hinojo salvaje y sal marina pura.',
      en: 'Gently warmed with smoked trout fat, warm wild fennel flower emulsion, and pristine sea salt.',
    },
    provenance: {
      es: 'Caleta de aguas frías · Cabo Blanco',
      en: 'Cold-water bay · Cabo Blanco',
    },
    pairing: {
      es: 'Semillón de Viñas Viejas 1968 (Río Negro Alto)',
      en: 'Old Vine Semillon 1968 (Upper Rio Negro Valley)',
    },
    price: 38,
    dietary: ['pescatarian', 'gluten-free'],
  },
  {
    id: 'sunchoke-resin',
    num: '05',
    category: 'hearth',
    title: {
      es: 'Topinambur Asado en Resina y Mantequilla Tostada',
      en: 'Resin-Roasted Sunchoke & Brown Butter Quenelle',
    },
    desc: {
      es: 'Tubérculos caramelizados en resina pura de alerce, crumble crujiente de trigo sarraceno y quenelle de levadura viva.',
      en: 'Slow-caramelized sunchoke with pure larch resin glaze, crisp buckwheat crumble, and wild yeast quenelle.',
    },
    provenance: {
      es: 'Suelo volcánico aluvial · Chacra San Martín',
      en: 'Alluvial volcanic soil · San Martin Farm',
    },
    pairing: {
      es: 'Torrontés Naranjo de Maceración Pelicular 2023 (Cafayate)',
      en: 'Skin-Contact Orange Torrontés 2023 (High Altitude)',
    },
    price: 34,
    dietary: ['plant-forward'],
    image: '/images/kon-dish-sunchoke.webp',
    isSignature: true,
  },
  {
    id: 'wood-morel',
    num: '06',
    category: 'hearth',
    title: {
      es: 'Hongos Morchella al Fuego de Quebracho',
      en: 'Quebracho-Fired Wild Morel Mushrooms',
    },
    desc: {
      es: 'Morchellas silvestres asadas en parrilla abierta, reducción concentrada de raíces tostadas y brotes de ajo negro.',
      en: 'Wild morels blistered over open hardwood coals, roasted root glaze, and black garlic shoots.',
    },
    provenance: {
      es: 'Recolección silvestre tras primeras lluvias andinas',
      en: 'Foraged in mountain pine forests after spring rain',
    },
    pairing: {
      es: 'Pinot Noir de Parcela Sin Filtrar 2020 (San Patricio)',
      en: 'Single-Parcel Unfiltered Pinot Noir 2020 (Patagonia)',
    },
    price: 39,
    dietary: ['plant-forward', 'gluten-free'],
    image: '/images/kon-dish-morel.webp',
    isSignature: true,
  },
  {
    id: 'pasture-lamb',
    num: '07',
    category: 'pasture',
    title: {
      es: 'Cordero en Dos Cocciones con Cenizas de Romero',
      en: 'Two-Way Mountain Lamb with Rosemary Ash Crust',
    },
    desc: {
      es: 'Lomo tierno sellado a las brasas y costillar braseado 14 horas, puré de chirivía ahumada y reducción de sauco.',
      en: 'Charcoal-seared tenderloin and 14-hour braised rib, smoked parsnip purée, and mountain elderberry glaze.',
    },
    provenance: {
      es: 'Pasturas altas de estepa patagónica',
      en: 'High-altitude Patagonian steppe pastures',
    },
    pairing: {
      es: 'Cabernet Franc de Suelo Calcáreo 2018 (Gualtallary)',
      en: 'Limestone Terroir Cabernet Franc 2018 (Gualtallary)',
    },
    price: 46,
    dietary: ['gluten-free'],
    image: '/images/kon-dish-lamb.webp',
    isSignature: true,
  },
  {
    id: 'sweetbreads-applewood',
    num: '08',
    category: 'pasture',
    title: {
      es: 'Molleja Glaseada al Humo de Manzano y Oxalis',
      en: 'Applewood-Smoked Sweetbreads with Wild Oxalis',
    },
    desc: {
      es: 'Corte crocante laqueado en reducción agridulce de chicha de manzana silvestre y hojas frescas de oxalis ácida.',
      en: 'Crispy glazed sweetbreads with fermented cider reduction and tart wild oxalis leaves.',
    },
    provenance: {
      es: 'Valle templado de frutales orgánicos',
      en: 'Organic mountain apple valley',
    },
    pairing: {
      es: 'Malbec de Pie Franco sin Sulfitos 2021 (El Cepillo)',
      en: 'Ungrafted Natural Malbec 2021 (El Cepillo)',
    },
    price: 42,
    dietary: ['gluten-free'],
  },
  {
    id: 'wild-cacao',
    num: '09',
    category: 'closing',
    title: {
      es: 'Cacao Salvaje, Malta Tostada y Sal de Cabo Blanco',
      en: 'Wild Cacao, Roasted Malt & Cabo Blanco Sea Salt',
    },
    desc: {
      es: 'Láminas crocantes de cacao 74%, helado de leche de oveja ahumada con madera de cerezo y gotas de oliva virgen.',
      en: '74% wild cacao shards, cherrywood-smoked sheep milk gelato, and cold-pressed extra virgin olive oil.',
    },
    provenance: {
      es: 'Cacao de origen y tambo ovino de precordillera',
      en: 'Heritage cacao and mountain sheep artisan dairy',
    },
    pairing: {
      es: 'Vino de Licor de Cosecha Tardía Botrytis 2016',
      en: 'Late Harvest Botrytis Fortified Wine 2016',
    },
    price: 24,
    dietary: ['plant-forward', 'gluten-free'],
    image: '/images/kon-dish-dessert.webp',
    isSignature: true,
  },
  {
    id: 'elderflower-snow',
    num: '10',
    category: 'closing',
    title: {
      es: 'Nieve de Saúco y Sorbet de Verbena Limonera',
      en: 'Elderflower Snow & Lemon Verbena Sorbet',
    },
    desc: {
      es: 'Cristales helados de flores de saúco, sorbet botánico refrescante y miel de pradera silvestre recolectada a mano.',
      en: 'Frozen elderflower crystals, herbal lemon verbena sorbet, and raw mountain wildflower honey.',
    },
    provenance: {
      es: 'Ribera de arroyo andino · Floración de primavera',
      en: 'Alpine creek bank · Spring floral bloom',
    },
    pairing: {
      es: 'Kombucha cruda de Té Oolong y Miel de Bosque',
      en: 'Raw Oolong & Forest Honey Fermented Kombucha',
    },
    price: 20,
    dietary: ['plant-forward', 'gluten-free'],
  },
];

export const KON_SIGNATURE_DISHES = KON_DISHES.filter((d) => d.isSignature);

export const KON_AMBIENCE_SPACES: AmbienceSpace[] = [
  {
    id: 'hearth',
    num: '01',
    title: { es: 'La Barra del Fuego', en: 'The Open Hearth' },
    subtitle: { es: 'Cocina viva y fuego abierto', en: 'Live fire & open hearth cooking' },
    desc: {
      es: '8 asientos exclusivos frente a las brasas de quebracho y los asadores de piedra volcánica. Los comensales presencian el ritmo milimétrico de la brigada y el ensamblaje de cada plato en vajilla artesanal.',
      en: '8 counter seats directly fronting glowing quebracho coals and volcanic stone hearths. Guests experience the exact rhythm of the kitchen brigade and precise dish assembly on handcrafted ceramics.',
    },
    specs: {
      es: '8 comensales · Vista directa a fuegos · Servicio personalizado',
      en: '8 guests · Direct hearth view · Personalized chef service',
    },
    image: '/images/kon-hearth-fire.webp',
  },
  {
    id: 'hall',
    num: '02',
    title: { es: 'El Salón de Basalto', en: 'The Stone Hall' },
    subtitle: { es: 'Silencio acústico y luz tenue', en: 'Acoustic tranquility & candlelit tables' },
    desc: {
      es: 'Mesas circulares talladas en roble carbonizado y muros de piedra volcánica. Diseñado con acústica absorbente para que la conversación fluya sin interferencias ni ruidos de fondo.',
      en: 'Circular tables shaped from charred oak and volcanic basalt walls. Acoustically softened to preserve conversation intimacy free from abrasive restaurant din.',
    },
    specs: {
      es: 'Mesas de 2 a 4 comensales · Aislamiento acústico · Luz de vela',
      en: '2 to 4 guests per table · Acoustic dampening · Candlelit ambiance',
    },
    image: '/images/kon-interior.webp',
  },
  {
    id: 'cellar',
    num: '03',
    title: { es: 'La Cava de Mínima Intervención', en: 'The Living Cellar' },
    subtitle: { es: 'Vinos naturales, ánforas & fermentos', en: 'Natural wines, amphorae & alive ferments' },
    desc: {
      es: 'Más de 180 etiquetas de viticultura biológica, fermentaciones salvajes en vasijas de barro y sidras de altura. Cada maridaje dialoga de manera estrecha con la mineralidad y el humo de los platos.',
      en: 'Over 180 low-intervention biological vintages, clay amphora wild fermentations, and high-altitude ciders. Each pairing dialogues directly with dish smoke and mineral salinity.',
    },
    specs: {
      es: '180+ etiquetas naturales · Vasijas de barro · Temperatura 14°C',
      en: '180+ natural labels · Clay amphorae · Constant 14°C cellaring',
    },
    image: '/images/kon-cellar-wine.webp',
  },
  {
    id: 'pantry',
    num: '04',
    title: { es: 'La Despensa Silvestre', en: 'The Botanical Pantry' },
    subtitle: { es: 'Recolección andina y preservas', en: 'Andean foraging & living preservation' },
    desc: {
      es: 'El laboratorio botánico donde descansan los vinagres de flores nativas, las bayas de enebro maceradas, las agujas de alerce deshidratadas y las kombuchas en lenta maduración.',
      en: 'The culinary laboratory housing wild floral vinegars, macerated juniper berries, dried larch needles, and slow-maturing medicinal herb kombuchas.',
    },
    specs: {
      es: 'Recolección semanal · Fermentos propios · Hierbas nativas',
      en: 'Weekly mountain foraging · In-house ferments · Native botany',
    },
    image: '/images/kon-botanical-pantry.webp',
  },
];

export const KON_TABLE_ZONES: TableZone[] = [
  {
    id: 'hearth',
    name: { es: 'The Open Hearth (Barra frente al fuego)', en: 'The Open Hearth (Fire counter)' },
    capacity: { es: '1 a 2 comensales · 8 banquetas', en: '1 to 2 guests · 8 counter seats' },
    atmosphere: { es: 'Vista directa al fuego vivo y brigada de cocina', en: 'Direct view of live hearth fire and culinary brigade' },
  },
  {
    id: 'stone',
    name: { es: 'The Stone Hall (Salón de piedra volcánica)', en: 'The Stone Hall (Basalt dining room)' },
    capacity: { es: '2 a 4 comensales · Mesas privadas', en: '2 to 4 guests · Private tables' },
    atmosphere: { es: 'Ambiente íntimo, luz tenue y acústica silenciosa', en: 'Intimate setting, candlelit, acoustic quiet' },
  },
  {
    id: 'alcove',
    name: { es: 'The Botanical Alcove (Jardín interior)', en: 'The Botanical Alcove (Indoor garden)' },
    capacity: { es: '2 a 6 comensales · Banqueta corrida', en: '2 to 6 guests · Garden banquette' },
    atmosphere: { es: 'Rodeado de flora nativa andina y hierbas frescas', en: 'Surrounded by native Andean flora and fresh herbs' },
  },
  {
    id: 'vault',
    name: { es: 'The Private Vault (Cava de vinos)', en: 'The Private Vault (Wine cellar table)' },
    capacity: { es: '4 a 6 comensales · Mesa exclusiva', en: '4 to 6 guests · Exclusive cellar table' },
    atmosphere: { es: 'Privacidad absoluta entre barricas y botellas de guarda', en: 'Absolute privacy among oak barrels and library vintages' },
  },
];
