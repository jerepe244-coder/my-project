import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

describe('ZYRVAE Digital Studio Quality & Integrity Verification', () => {
  test('Public SVG images and icons exist on disk', () => {
    const requiredImages = [
      'aura-cover.svg',
      'aura-detail-1.svg',
      'aura-detail-2.svg',
      'kon-cover.svg',
      'kon-detail-1.svg',
      'kon-detail-2.svg',
      'vectra-cover.svg',
      'vectra-detail-1.svg',
      'vectra-detail-2.svg',
      'soma-cover.svg',
      'soma-detail-1.svg',
      'soma-detail-2.svg',
    ];

    for (const img of requiredImages) {
      const fullPath = path.join(process.cwd(), 'public', 'images', img);
      assert.ok(fs.existsSync(fullPath), `Missing image asset: ${img}`);
      const stats = fs.statSync(fullPath);
      assert.ok(stats.size > 200, `Image asset is too small: ${img}`);
    }

    assert.ok(fs.existsSync(path.join(process.cwd(), 'public', 'icon.svg')), 'Missing public/icon.svg');
  });

  test('Project data structure integrity and honest concept declarations', async () => {
    const { projects } = await import('../src/data/projects.ts');
    assert.equal(projects.length, 4, 'Must have exactly 4 concept projects');

    for (const project of projects) {
      assert.equal(project.isConcept, true, `Project ${project.slug} must be declared as a concept`);
      assert.ok(project.title, `Project ${project.slug} must have a title`);
      assert.ok(project.tagline.es && project.tagline.en, `Project ${project.slug} must have bilingual tagline`);
      assert.ok(project.clientContext.es && project.clientContext.en, `Project ${project.slug} context missing`);
      assert.ok(project.designGoal.es && project.designGoal.en, `Project ${project.slug} design goal missing`);
      assert.ok(project.visualDecisions.length >= 2, `Project ${project.slug} must have visual decisions`);
      assert.ok(project.interactions.length >= 2, `Project ${project.slug} must have interactions`);
      assert.ok(project.features.length >= 2, `Project ${project.slug} must have features`);
      assert.ok(project.potentialBenefits.length >= 1, `Project ${project.slug} must have potential benefits`);
      assert.ok(['hospitality', 'gastronomy', 'architecture', 'ecommerce'].includes(project.demoType), `Invalid demo type`);
    }
  });

  test('Translations symmetry between Spanish and English', async () => {
    const { translations } = await import('../src/data/translations.ts');

    const getKeysDeep = (obj, prefix = '') => {
      let keys = [];
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          keys = keys.concat(getKeysDeep(value, fullKey));
        } else {
          keys.push(fullKey);
        }
      }
      return keys;
    };

    const esKeys = getKeysDeep(translations.es).sort();
    const enKeys = getKeysDeep(translations.en).sort();

    assert.deepEqual(esKeys, enKeys, 'Spanish and English translations must share the exact same key structure');
  });

  test('Services, Process and FAQ bilingual data presence', async () => {
    const { services } = await import('../src/data/services.ts');
    const { processStages } = await import('../src/data/process.ts');
    const { faqItems } = await import('../src/data/faq.ts');

    assert.equal(services.length, 5, 'Must have 5 core services');
    assert.equal(processStages.length, 5, 'Must have 5 process stages');
    assert.equal(faqItems.length, 8, 'Must have 8 comprehensive FAQ items');

    for (const item of faqItems) {
      assert.ok(item.question.es && item.question.en, `FAQ ${item.id} missing question`);
      assert.ok(item.answer.es && item.answer.en, `FAQ ${item.id} missing answer`);
    }
  });

  test('Environment configuration documentation exists', () => {
    const envExamplePath = path.join(process.cwd(), '.env.example');
    assert.ok(fs.existsSync(envExamplePath), '.env.example must exist');
    const content = fs.readFileSync(envExamplePath, 'utf-8');
    assert.ok(content.includes('RESEND_API_KEY'), '.env.example must document RESEND_API_KEY');
    assert.ok(content.includes('zyrvae.co@gmail.com'), '.env.example must reference zyrvae.co@gmail.com');
  });

  test('Dark and Light theme system tokens, provider, anti-FOUC script, and selector integration', async () => {
    const { THEME_STORAGE_KEY } = await import('../src/context/ThemeContext.tsx');
    assert.equal(THEME_STORAGE_KEY, 'zyrvae_theme', 'Theme storage key must be zyrvae_theme');

    const globalsCss = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'globals.css'), 'utf-8');
    assert.ok(globalsCss.includes('html.dark'), 'globals.css must define html.dark tokens');
    assert.ok(globalsCss.includes('html.light'), 'globals.css must define html.light tokens');
    assert.ok(globalsCss.includes('--zy-bg:'), 'globals.css must define centralized --zy-bg token');
    assert.ok(globalsCss.includes('--zy-fg:'), 'globals.css must define centralized --zy-fg token');
    assert.ok(globalsCss.includes('--zy-blue: #0a5cff'), 'globals.css must preserve electric blue accent');

    const layoutTsx = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'layout.tsx'), 'utf-8');
    assert.ok(layoutTsx.includes('zyrvae_theme'), 'layout.tsx must include anti-FOUC script reading zyrvae_theme');
    assert.ok(layoutTsx.includes('prefers-color-scheme: light'), 'layout.tsx must detect system color scheme preference');
    assert.ok(layoutTsx.includes('<ThemeProvider>'), 'layout.tsx must wrap application in ThemeProvider');

    const headerTsx = fs.readFileSync(path.join(process.cwd(), 'src', 'components', 'layout', 'Header.tsx'), 'utf-8');
    assert.ok(headerTsx.includes('<ThemeToggle'), 'Header.tsx must render ThemeToggle selector');
  });

  test('AURA Sanctuary web experience preserves suites, images, rates, and hotel sections', async () => {
    const { AURA_SUITES } = await import('../src/components/demos/HospitalityDemo.tsx');
    assert.equal(AURA_SUITES.length, 3, 'AURA Sanctuary must define 3 suites');
    assert.deepEqual(
      AURA_SUITES.map((s) => s.baseRate),
      [480, 390, 620],
      'AURA suite nightly rates must remain 480, 390, 620'
    );
    assert.deepEqual(
      AURA_SUITES.map((s) => s.image),
      [
        '/images/aura-suite-panoramic.webp',
        '/images/aura-suite-forest.webp',
        '/images/aura-suite-monolith.webp',
      ],
      'AURA suite images must remain intact'
    );
    for (const suite of AURA_SUITES) {
      const imgDiskPath = path.join(process.cwd(), 'public', suite.image.replace(/^\//, ''));
      assert.ok(fs.existsSync(imgDiskPath), `Suite image ${suite.image} must exist on disk`);
    }

    const caseStudyTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'CaseStudyClient.tsx'),
      'utf-8'
    );
    for (const sectionId of ['aura-hero', 'aura-suites', 'aura-experiences', 'aura-booking', 'aura-info']) {
      assert.ok(
        caseStudyTsx.includes(`id="${sectionId}"`),
        `CaseStudyClient.tsx must include #${sectionId} hotel section`
      );
    }
  });

  test('KÔN Atelier gastronomy web experience defines menu, images, categories, and restaurant sections', async () => {
    const {
      KON_CATEGORIES,
      KON_DISHES,
      KON_SIGNATURE_DISHES,
      KON_AMBIENCE_SPACES,
      KON_TABLE_ZONES,
    } = await import('../src/data/gastronomy.ts');

    assert.equal(KON_CATEGORIES.length, 6, 'Must define 6 menu category views');
    assert.equal(KON_DISHES.length, 10, 'Must define 10 seasonal culinary dishes');
    assert.equal(KON_SIGNATURE_DISHES.length, 5, 'Must define 5 signature dishes with photography');
    assert.equal(KON_AMBIENCE_SPACES.length, 4, 'Must define 4 restaurant spaces with photography');
    assert.equal(KON_TABLE_ZONES.length, 4, 'Must define 4 seating zones for reservation simulator');

    // Verify all images referenced by KÔN exist on disk and are optimized WebPs
    const requiredKonImages = [
      '/images/kon-hero.webp',
      '/images/kon-interior.webp',
      '/images/kon-hearth-fire.webp',
      '/images/kon-dish-trout.webp',
      '/images/kon-dish-sunchoke.webp',
      '/images/kon-dish-morel.webp',
      '/images/kon-dish-lamb.webp',
      '/images/kon-dish-dessert.webp',
      '/images/kon-cellar-wine.webp',
      '/images/kon-botanical-pantry.webp',
    ];

    for (const imgPath of requiredKonImages) {
      const diskPath = path.join(process.cwd(), 'public', imgPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `KÔN image asset missing on disk: ${imgPath}`);
      const stats = fs.statSync(diskPath);
      assert.ok(stats.size > 10000, `KÔN image asset is too small: ${imgPath}`);
    }

    // Verify each dish has bilingual details
    for (const dish of KON_DISHES) {
      assert.ok(dish.title.es && dish.title.en, `Dish ${dish.id} missing bilingual title`);
      assert.ok(dish.desc.es && dish.desc.en, `Dish ${dish.id} missing bilingual description`);
      assert.ok(dish.provenance.es && dish.provenance.en, `Dish ${dish.id} missing provenance`);
      assert.ok(dish.pairing.es && dish.pairing.en, `Dish ${dish.id} missing wine pairing`);
      assert.ok(dish.price > 0, `Dish ${dish.id} must have a valid price`);
      assert.ok(dish.dietary.length > 0, `Dish ${dish.id} must have dietary tags`);
    }

    // Verify restaurant sections in KonRestaurantExperience.tsx
    const konComponentTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'KonRestaurantExperience.tsx'),
      'utf-8'
    );
    for (const sectionId of [
      'kon-hero',
      'kon-concept',
      'kon-menu',
      'kon-dishes',
      'kon-ambience',
      'kon-booking',
      'kon-info',
    ]) {
      assert.ok(
        konComponentTsx.includes(`id="${sectionId}"`),
        `KonRestaurantExperience.tsx must include #${sectionId} restaurant section`
      );
    }
  });

  test('MONOLITH Studio architecture web experience defines projects, materials, gallery, and studio sections', async () => {
    const {
      MONOLITH_STUDIO_META,
      MONOLITH_PILLARS,
      MONOLITH_PROJECTS,
      MONOLITH_MATERIALS,
      MONOLITH_GALLERY,
    } = await import('../src/data/architecture.ts');

    assert.equal(MONOLITH_STUDIO_META.heroTitle, 'Spaces shaped by light.', 'Must preserve canonical hero headline');
    assert.equal(MONOLITH_PILLARS.length, 4, 'Must define 4 tectonic philosophy pillars');
    assert.equal(MONOLITH_PROJECTS.length, 6, 'Must define 6 concept architectural projects');
    assert.equal(MONOLITH_MATERIALS.length, 4, 'Must define 4 tectonic materials');
    assert.equal(MONOLITH_GALLERY.length, 8, 'Must define 8 architectural gallery frames');

    // Verify all images referenced by MONOLITH exist on disk and are optimized WebPs
    const requiredMonolithImages = [
      '/images/monolith-hero.webp',
      '/images/monolith-project-1.webp',
      '/images/monolith-project-2.webp',
      '/images/monolith-project-3.webp',
      '/images/monolith-project-4.webp',
      '/images/monolith-project-5.webp',
      '/images/monolith-project-6.webp',
      '/images/monolith-interior-light.webp',
      '/images/monolith-staircase.webp',
      '/images/monolith-courtyard.webp',
      '/images/monolith-detail-concrete.webp',
      '/images/monolith-detail-stone.webp',
      '/images/monolith-detail-wood.webp',
      '/images/monolith-gallery-1.webp',
      '/images/monolith-gallery-2.webp',
      '/images/monolith-gallery-3.webp',
      '/images/monolith-gallery-4.webp',
    ];

    for (const imgPath of requiredMonolithImages) {
      const diskPath = path.join(process.cwd(), 'public', imgPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `MONOLITH image asset missing on disk: ${imgPath}`);
      const stats = fs.statSync(diskPath);
      assert.ok(stats.size > 20000, `MONOLITH image asset is too small: ${imgPath}`);
    }

    // Verify each project has bilingual details & spatial decisions
    for (const proj of MONOLITH_PROJECTS) {
      assert.ok(proj.title.es && proj.title.en, `Project ${proj.id} missing bilingual title`);
      assert.ok(proj.subtitle.es && proj.subtitle.en, `Project ${proj.id} missing bilingual subtitle`);
      assert.ok(proj.concept.es && proj.concept.en, `Project ${proj.id} missing concept`);
      assert.ok(proj.spatialDecisions.length >= 3, `Project ${proj.id} must have at least 3 spatial decisions`);
      assert.ok(proj.specifications.length >= 3, `Project ${proj.id} must have specifications`);
    }

    // Verify each material has bilingual finish and properties
    for (const mat of MONOLITH_MATERIALS) {
      assert.ok(mat.name.es && mat.name.en, `Material ${mat.id} missing bilingual name`);
      assert.ok(mat.properties.finish.es && mat.properties.finish.en, `Material ${mat.id} missing finish`);
      assert.ok(mat.properties.sustainability.es && mat.properties.sustainability.en, `Material ${mat.id} missing sustainability`);
    }

    // Verify studio sections in MonolithArchitectureExperience.tsx
    const monolithComponentTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'MonolithArchitectureExperience.tsx'),
      'utf-8'
    );
    for (const sectionId of [
      'monolith-hero',
      'monolith-philosophy',
      'monolith-works',
      'monolith-study',
      'monolith-tectonics',
      'monolith-gallery',
      'monolith-contact',
    ]) {
      assert.ok(
        monolithComponentTsx.includes(`id="${sectionId}"`),
        `MonolithArchitectureExperience.tsx must include #${sectionId} studio section`
      );
    }
  });

  test('SŌMA Formulations luxury e-commerce experience defines products, images, variants, and store sections', async () => {
    const {
      SOMA_PRODUCTS,
      SOMA_STUDIO_META,
    } = await import('../src/data/commerce.ts');

    assert.equal(SOMA_STUDIO_META.name, 'SŌMA FORMULATIONS', 'Must preserve brand name');
    assert.equal(SOMA_STUDIO_META.pillars.length, 4, 'Must define 4 formulation pillars');
    assert.equal(SOMA_PRODUCTS.length, 6, 'Must define 6 cellular skincare products');

    // Verify all images referenced by SŌMA exist on disk and are optimized WebPs
    const requiredSomaImages = [
      '/images/soma-hero-editorial.webp',
      '/images/soma-product-01.webp',
      '/images/soma-product-02.webp',
      '/images/soma-product-03.webp',
      '/images/soma-product-04.webp',
      '/images/soma-product-05.webp',
      '/images/soma-product-06.webp',
      '/images/soma-lifestyle-ritual.webp',
      '/images/soma-botanical-lab.webp',
      '/images/soma-vessel-miron.webp',
    ];

    for (const imgPath of requiredSomaImages) {
      const diskPath = path.join(process.cwd(), 'public', imgPath.replace(/^\//, ''));
      assert.ok(fs.existsSync(diskPath), `SŌMA image asset missing on disk: ${imgPath}`);
      const stats = fs.statSync(diskPath);
      assert.ok(stats.size > 20000, `SŌMA image asset is too small: ${imgPath}`);
    }

    // Verify each product has bilingual details, pricing, variants, and actives
    for (const prod of SOMA_PRODUCTS) {
      assert.ok(prod.title.es && prod.title.en, `Product ${prod.id} missing bilingual title`);
      assert.ok(prod.tagline.es && prod.tagline.en, `Product ${prod.id} missing tagline`);
      assert.ok(prod.description.es && prod.description.en, `Product ${prod.id} missing description`);
      assert.ok(prod.basePrice > 0, `Product ${prod.id} base price must be positive`);
      assert.ok(prod.sizes.length >= 2, `Product ${prod.id} must have at least 2 size variants`);
      assert.ok(prod.vessels.length >= 2, `Product ${prod.id} must offer glass and refill vessels`);
      assert.ok(prod.actives.length >= 2, `Product ${prod.id} must declare active ingredients`);
      assert.ok(prod.sensory.texture.es && prod.sensory.texture.en, `Product ${prod.id} missing texture`);
      assert.ok(prod.sensory.origin.es && prod.sensory.origin.en, `Product ${prod.id} missing origin`);
    }

    // Verify store sections in SomaCommerceExperience.tsx
    const somaComponentTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'SomaCommerceExperience.tsx'),
      'utf-8'
    );
    for (const sectionId of [
      'soma-hero',
      'soma-philosophy',
      'soma-catalog',
      'soma-science',
      'soma-rituals',
      'soma-footer',
    ]) {
      assert.ok(
        somaComponentTsx.includes(`id="${sectionId}"`),
        `SomaCommerceExperience.tsx must include #${sectionId} store section`
      );
    }
  });

  test('Home page sections, geometric monogram blueprint, portfolio demo links, and reduced-motion support', () => {
    const heroTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Hero.tsx'),
      'utf-8'
    );
    assert.ok(heroTsx.includes('showBlueprint={true}'), 'Hero must render geometric monogram with blueprint framing');
    assert.ok(heroTsx.includes('useReducedMotion'), 'Hero must respect prefers-reduced-motion');
    for (const slug of ['aura-sanctuary', 'kon-atelier', 'vectra-architects', 'soma-formulations']) {
      assert.ok(heroTsx.includes(slug), `Hero specimen index must link to ${slug}`);
    }

    const portfolioTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Portfolio.tsx'),
      'utf-8'
    );
    for (const anchor of ['aura-booking', 'kon-menu', 'monolith-study', 'soma-catalog']) {
      assert.ok(
        portfolioTsx.includes(anchor),
        `Portfolio must provide direct functional link to interactive demo anchor #${anchor}`
      );
    }
    assert.ok(
      portfolioTsx.includes('expandedSpecSlug'),
      'Portfolio must allow inspecting case study specifications and context'
    );
  });

  test('UI/UX Audit & Awwwards Redesign Verification (Contrast, Grid, Hero, FAQ Accordion, Live Demos, Copy & Icons)', async () => {
    const { projects } = await import('../src/data/projects.ts');
    const translationsRaw = fs.readFileSync(
      path.join(process.cwd(), 'src', 'data', 'translations.ts'),
      'utf-8'
    );

    // 1. No duplicate Unicode arrows in translation strings
    for (const glyph of ['↗', '↓', '↑', '→', '←']) {
      assert.equal(
        translationsRaw.includes(glyph),
        false,
        `translations.ts must not contain Unicode arrow ${glyph} (prevents double arrow glitch with SVG icons)`
      );
    }

    // 2. Project 03 ID code and pure Spanish tagline
    const project03 = projects.find((p) => p.title === 'MONOLITH Studio');
    assert.ok(project03, 'Project 03 MONOLITH Studio must exist');
    assert.equal(project03.idCode, 'MONOLITH-STUDIO', 'Project 03 formal ID code must be MONOLITH-STUDIO');
    assert.ok(
      project03.tagline.es.startsWith('Espacios modelados por la luz:'),
      'Project 03 Spanish tagline must be fully translated into Spanish'
    );

    // 3. Palette & WCAG 2.1 AA contrast tokens (#0a0a0c dark graphite + #475569 light mode secondary text)
    const globalsCss = fs.readFileSync(
      path.join(process.cwd(), 'src', 'app', 'globals.css'),
      'utf-8'
    );
    assert.ok(globalsCss.includes('#0a0a0c'), 'Dark mode must use deep graphite #0a0a0c');
    assert.ok(globalsCss.includes('#475569'), 'Light mode secondary text must use medium graphite #475569 for WCAG AA');

    // 4. Hero padding-top: 120px, corner coordinates, and un-overlapped typography
    const heroTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Hero.tsx'),
      'utf-8'
    );
    assert.ok(heroTsx.includes('120px'), 'Hero must enforce 120px top padding to clear floating header');
    assert.ok(heroTsx.includes('cornerCoordinates'), 'Hero must render 4 viewport corner coordinate micro-labels');
    assert.equal(heroTsx.includes('-mt-['), false, 'Hero headline must not overlap layers with negative margins');

    // 5. Portfolio homogeneous 12-column grid, 1px border-neutral-800, [LIVE DEMO] widgets, 44x44px targets & in-situ modal
    const portfolioTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Portfolio.tsx'),
      'utf-8'
    );
    assert.ok(portfolioTsx.includes('lg:grid-cols-12'), 'Portfolio must use 12-column modular grid');
    assert.ok(portfolioTsx.includes('border-neutral-800'), 'Portfolio must use 1px border-neutral-800 separators');
    assert.ok(portfolioTsx.includes('[LIVE DEMO]'), 'Portfolio must embed interactive [LIVE DEMO] micro-widgets');
    assert.ok(portfolioTsx.includes('activeDemoModalSlug'), 'Portfolio must open interactive demo in-situ via modal');
    assert.ok(portfolioTsx.includes('min-w-[44px] min-h-[44px]'), 'Portfolio controls must meet 44x44px touch target minimum');
    assert.ok(portfolioTsx.includes('project.idCode'), 'Portfolio must display formal project.idCode');

    // 6. Header deterministic IntersectionObserver active section synchronization
    const headerTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'Header.tsx'),
      'utf-8'
    );
    assert.ok(headerTsx.includes('IntersectionObserver'), 'Header must use IntersectionObserver');
    assert.ok(headerTsx.includes('resolveCurrentSection'), 'Header must synchronize active section across all scroll depths');

    // 7. FAQ interactive collapsible accordion with smooth CSS transitions
    const faqTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'FAQ.tsx'),
      'utf-8'
    );
    assert.ok(faqTsx.includes('aria-expanded={isOpen}'), 'FAQ must implement accessible collapsible accordion');
    assert.ok(faqTsx.includes('grid-rows-[1fr]'), 'FAQ must animate accordion height smoothly with CSS grid rows');

    // 8. Secondary Typography Separation (Swiss Sans Sentence Case vs Technical Monospace)
    assert.ok(globalsCss.includes('.font-swiss'), 'globals.css must define .font-swiss for refined Swiss sans-serif labels');
    assert.equal(
      projects[0].categoryLabel.es,
      'Hospitalidad boutique',
      'Category labels must use natural Sentence case (e.g. Hospitalidad boutique)'
    );

    // 9. 5 Awwwards Visual Keys: Editorial Noise Overlay, Reactive Border Beam, Lenis Smooth Scroll, Contextual Pill Cursor, Staggered Reveals
    assert.ok(globalsCss.includes('.zy-noise-overlay'), 'globals.css must define .zy-noise-overlay for dark & light modes');
    const layoutTsx = fs.readFileSync(path.join(process.cwd(), 'src', 'app', 'layout.tsx'), 'utf-8');
    assert.ok(layoutTsx.includes('<NoiseOverlay />'), 'layout.tsx must mount fixed SVG NoiseOverlay');
    assert.ok(layoutTsx.includes('<SmoothScroll />'), 'layout.tsx must mount Lenis SmoothScroll controller');
    assert.ok(portfolioTsx.includes('<BorderBeamOverlay'), 'Portfolio cards must render reactive BorderBeamOverlay');
    assert.ok(portfolioTsx.includes('VER DEMO'), 'Portfolio must provide VER DEMO contextual cursor state');
    assert.ok(portfolioTsx.includes('EXPLORAR'), 'Portfolio must provide EXPLORAR contextual cursor state');
    assert.ok(portfolioTsx.includes('ARRASTRAR'), 'Portfolio must provide ARRASTRAR contextual cursor state');
    assert.ok(heroTsx.includes('pt-28 sm:pt-32'), 'Hero must include generous top padding classes to clear floating header at y=0');
  });

  test('Fase 1 Swiss Corporate Brutalism — The Monolith Grid Architecture & Visual Identity', () => {
    const globalsCss = fs.readFileSync(
      path.join(process.cwd(), 'src', 'app', 'globals.css'),
      'utf-8'
    );
    const headerTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'Header.tsx'),
      'utf-8'
    );
    const heroTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Hero.tsx'),
      'utf-8'
    );
    const perimeterTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'PerimeterMargins.tsx'),
      'utf-8'
    );
    const sealTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'CircularSeal.tsx'),
      'utf-8'
    );
    const sculptureTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'ObsidianSculpture.tsx'),
      'utf-8'
    );

    // 1. Chromatic Palette & Grid Hairlines
    assert.ok(globalsCss.includes('#EFEFEA'), 'Light mode primary background must use Raw Bone Paper #EFEFEA');
    assert.ok(globalsCss.includes('#0a0a0c'), 'Primary ink / dark ground must use Lithographic Black #0A0A0C');
    assert.ok(globalsCss.includes('#4A4D52'), 'Secondary metadata text must use Mineral Graphite #4A4D52');
    assert.ok(globalsCss.includes('#FF3B30'), 'Security Vermilion accent must be #FF3B30');
    assert.ok(globalsCss.includes('#D8D6CE'), 'Light mode divider hairlines must use #D8D6CE');
    assert.ok(globalsCss.includes('#1E2024'), 'Dark mode divider hairlines must use #1E2024');
    assert.ok(globalsCss.includes('border-radius: 0px !important'), 'Must enforce strict 0px border-radius (rounded-none)');

    // 2. Perimeter 40px Print Margins with 90-degree rotated technical typography
    assert.ok(perimeterTsx.includes('w-[28px] sm:w-[40px]'), 'Perimeter print margins must be 40px wide');
    assert.ok(perimeterTsx.includes('BUENOS AIRES'), 'Left print margin must display BUENOS AIRES');
    assert.ok(perimeterTsx.includes('© 2026'), 'Right print margin must display © 2026 and coordinates');

    // 3. Row 1 (Integrated Header): 4 continuous cells (20% | 45% | 20% | 15%)
    assert.ok(
      headerTsx.includes('lg:grid-cols-[20%_45%_20%_15%]'),
      'Header Row 1 must use 20% | 45% | 20% | 15% 4-column layout'
    );
    assert.ok(headerTsx.includes('ZYRVAE / PHASE 02 [02]'), 'Header Cell 1 must display ZYRVAE / PHASE 02 [02]');
    assert.ok(headerTsx.includes('p-[16px]'), 'Header Cell 1 must have 16px padding');
    for (const navItem of ['WORK', 'STUDIO', 'JOURNAL', 'ARCHIVE']) {
      assert.ok(headerTsx.includes(navItem), `Header Cell 2 must include ${navItem} link`);
    }
    assert.ok(headerTsx.includes('hover:line-through'), 'Header Cell 2 links must have strikethrough hover effect');
    assert.ok(headerTsx.includes('BUENOS AIRES, ARG'), 'Header Cell 3 must display BUENOS AIRES, ARG live clock');
    assert.ok(headerTsx.includes('bg-[#FF3B30]'), 'Header Cell 4 must be a solid vermilion #FF3B30 block');
    assert.ok(headerTsx.includes('CONTACT /'), 'Header Cell 4 top line must be CONTACT /');
    assert.ok(headerTsx.includes('INQUIRE'), 'Header Cell 4 bottom line must be INQUIRE →');

    // 4. Row 2 (Monumental Hero Cell): ZYRVAE Display + Instrument Serif Italic Manifesto
    assert.ok(
      heroTsx.includes('An avant-garde independent digital studio based in Buenos Aires, Argentina.'),
      'Hero Row 2 must include exact editorial manifesto sentence'
    );
    assert.ok(heroTsx.includes('font-serif-editorial italic'), 'Manifesto must use Instrument Serif Italic');

    // 5. Row 3 (Capabilities, Sculptural Asset & Signature Seal): 3 proportional cells (40% | 35% | 25%)
    assert.ok(
      heroTsx.includes('lg:grid-cols-[40%_35%_25%]'),
      'Hero Row 3 must use 40% | 35% | 25% 3-column layout'
    );
    assert.ok(heroTsx.includes('01 / CAPABILITIES'), 'Row 3 Cell 1 must display 01 / CAPABILITIES');
    assert.ok(heroTsx.includes('text-justify'), 'Row 3 Cell 1 description must be justified');
    assert.ok(heroTsx.includes('<ObsidianSculpture />'), 'Row 3 Cell 2 must render 3D ObsidianSculpture asset');
    assert.ok(sculptureTsx.includes('<canvas'), 'ObsidianSculpture must render 3D faceted obsidian & glass canvas');
    assert.ok(heroTsx.includes('02 / CURRENT PHASE'), 'Row 3 Cell 3 must display 02 / CURRENT PHASE');
    for (const phaseItem of ['— Art Direction', '— Interactive', '— CGI']) {
      assert.ok(heroTsx.includes(phaseItem), `Row 3 Cell 3 must list ${phaseItem}`);
    }
    assert.ok(sealTsx.includes('ZYRVAE · BS.AS. · ARG'), '70px CircularSeal must feature ZYRVAE · BS.AS. · ARG perimeter text');
    assert.ok(sealTsx.includes('viewBox="0 0 70 70"'), 'CircularSeal must be 70px in diameter');

    // 6. Pliego Consolidado de Dirección de Arte — 5 Correcciones de Fase 1:
    // (1) Micrografía técnica en grotesca suiza neutra Sentence case (10px, font-medium 500, tracking 0.015em, text-transform: none)
    assert.ok(globalsCss.includes('.font-editorial-micro'), 'globals.css must define .font-editorial-micro');
    assert.ok(globalsCss.includes('font-size: 10px'), 'Micro-typography must be 10px');
    assert.ok(globalsCss.includes('text-transform: none'), 'Micro-typography must enforce text-transform: none (Sentence case)');
    assert.ok(globalsCss.includes('letter-spacing: 0.015em'), 'Micro-typography must use subtle 0.015em tracking');

    // (2) Escultura central de obsidiana y cristal pre-renderizada en WebP transparente 2K contenida dentro de su celda
    const sculptureWebpPath = path.join(process.cwd(), 'public', 'images', 'obsidian-crystal-2k.webp');
    assert.ok(fs.existsSync(sculptureWebpPath), '2K transparent WebP sculpture asset must exist on disk');
    assert.ok(fs.statSync(sculptureWebpPath).size > 100000, '2K transparent WebP sculpture must be high definition (>100KB)');
    assert.ok(
      sculptureTsx.includes('/images/obsidian-crystal-2k.webp'),
      'ObsidianSculpture must render pre-rendered 2K transparent WebP asset'
    );
    assert.equal(
      heroTsx.includes("marginBottom: '-24px'"),
      false,
      'Sculpture must be strictly contained within its cell without overflowing bottom divider'
    );

    // (3) Proporción tipográfica condensada/vertical del titular ZYRVAE (800/900, tracking -0.04em, line-height 0.85)
    assert.ok(
      globalsCss.includes('--font-barlow-condensed'),
      'Display headline must use condensed/vertical grotesque typeface'
    );
    assert.ok(globalsCss.includes('font-stretch: condensed'), 'Display headline must specify condensed stretch');
    assert.ok(heroTsx.includes('font-black'), 'Hero ZYRVAE headline must use black (900) weight');

    // (4) Controles del Header separados por divisor vertical interno de 0.5px y sin cajas de fondo negro sólido
    assert.ok(
      headerTsx.includes("borderLeftWidth: '0.5px'"),
      'Header Cell 2 must separate system controls from nav links with a 0.5px internal vertical divider'
    );
    const themeToggleTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'ThemeToggle.tsx'),
      'utf-8'
    );
    const langSwitcherTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'LanguageSwitcher.tsx'),
      'utf-8'
    );
    assert.equal(
      themeToggleTsx.includes('bg-zy-fg'),
      false,
      'ThemeToggle must not use solid black background box (bg-zy-fg)'
    );
    assert.equal(
      langSwitcherTsx.includes('bg-zy-fg'),
      false,
      'LanguageSwitcher must not use solid black background box (bg-zy-fg)'
    );

    // (5) Cotas arquitectónicas (#94A3B8: 34.68°, 01.198) y cruces de registro en la retícula
    assert.ok(globalsCss.includes('#94A3B8'), 'globals.css must define #94A3B8 for architectural cota marks');
    assert.ok(heroTsx.includes('34.68°'), 'Hero grid must include 34.68° architectural cota mark');
    assert.ok(heroTsx.includes('01.198'), 'Hero grid must include 01.198 architectural cota mark');
    assert.ok(heroTsx.includes('RegistrationCross'), 'Hero grid must render fine typographic registration crosses at module corners');
  });

  test('Fase 2 — Poda Radical en 4 Actos, Láminas Full-Bleed, Laboratorio Técnico y Ascenso de la Obsidiana', () => {
    const pageTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'app', 'page.tsx'),
      'utf-8'
    );
    const heroTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Hero.tsx'),
      'utf-8'
    );
    const portfolioTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Portfolio.tsx'),
      'utf-8'
    );
    const servicesTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Services.tsx'),
      'utf-8'
    );
    const contactTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'ContactForm.tsx'),
      'utf-8'
    );
    const caseStudyClientTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'CaseStudyClient.tsx'),
      'utf-8'
    );
    const monolithExpTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'MonolithArchitectureExperience.tsx'),
      'utf-8'
    );
    const somaExpTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'SomaCommerceExperience.tsx'),
      'utf-8'
    );
    const konExpTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'KonRestaurantExperience.tsx'),
      'utf-8'
    );

    // 1. Poda radical de la Home: Estructura fija en 4 actos y supresión del bloque FAQ
    const pageWithoutComments = pageTsx.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    assert.equal(
      pageWithoutComments.includes('<FAQ'),
      false,
      'Home page must completely remove FAQ accordion block'
    );
    assert.equal(
      pageWithoutComments.includes('<Process'),
      false,
      'Home page must condense Process into Acto 3 Services'
    );
    assert.equal(
      pageWithoutComments.includes('<Studio'),
      false,
      'Home page must condense Studio into Acto 3 Services'
    );
    assert.ok(heroTsx.includes('data-act="01"'), 'Hero must be marked as Acto 1');
    assert.ok(portfolioTsx.includes('data-act="02"'), 'Portfolio must be marked as Acto 2');
    assert.ok(servicesTsx.includes('data-act="03"'), 'Services & Philosophy must be marked as Acto 3');
    assert.ok(contactTsx.includes('data-act="04"'), 'Contact & Footer must be marked as Acto 4');

    // 2. Fusión de Proceso y Estudio en una retícula suiza limpia de 4 columnas (Acto 3)
    assert.ok(
      servicesTsx.includes('lg:grid-cols-4'),
      'Acto 3 (Capacidades y Filosofía) must use a clean 4-column Swiss grid (lg:grid-cols-4)'
    );
    assert.ok(
      servicesTsx.includes('id="studio"') && servicesTsx.includes('id="process"'),
      'Acto 3 must preserve #studio and #process navigation anchors within the unified section'
    );

    // 3. Retirada de widgets utilitarios de la Home y unificación de CTA
    const portfolioNoComments = portfolioTsx.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    for (const demoComponent of ['<HospitalityDemo', '<GastronomyDemo', '<ArchitectureDemo', '<EcommerceDemo']) {
      assert.equal(
        portfolioNoComments.includes(demoComponent),
        false,
        `Portfolio on Home must not render embedded ${demoComponent}`
      );
    }
    assert.ok(
      portfolioTsx.includes('EXPLORAR CASO DE ESTUDIO ↗'),
      'Each project on the Home page must present the unified typographic link EXPLORAR CASO DE ESTUDIO ↗'
    );

    // 4. Anatomía visual de las nuevas láminas de proyectos (Full-Bleed, Marca de Agua, Ficha Técnica 3 filas, Ritmo Asimétrico)
    assert.ok(
      portfolioTsx.includes('data-plate={projectNumber}'),
      'Each portfolio plate must include a colossal watermark number (01, 02, 03, 04)'
    );
    assert.ok(
      portfolioTsx.includes('data-watermark={projectNumber}'),
      'Portfolio plates must render low-contrast platinum watermark behind technical specification sheet'
    );
    assert.ok(
      portfolioTsx.includes('AURA SANCTUARY · Hospitality & Botanical Retreat'),
      'Fila superior must display Client and Typology (e.g. AURA SANCTUARY · Hospitality & Botanical Retreat)'
    );
    assert.ok(
      portfolioTsx.includes('line-clamp-2'),
      'Fila intermedia must display conceptual headline and 2-line editorial synthesis'
    );
    assert.ok(
      portfolioTsx.includes('Patagonia') && portfolioTsx.includes('Brand Identity & Digital Engine'),
      'Fila inferior must display divided metadata cells (Año | Ubicación | Disciplina)'
    );
    assert.ok(
      portfolioTsx.includes('lg:col-span-12') &&
        portfolioTsx.includes('lg:col-span-7') &&
        portfolioTsx.includes('lg:col-span-5'),
      'Portfolio must alternate between full-width colossal plates (col-span-12) and asymmetric 2-column diptychs (col-span-7 + col-span-5)'
    );

    // 5. Reubicación de las demos en /case-study/[slug] bajo el sello "Laboratorio Técnico & Prototipo Funcional"
    for (const [name, source] of [
      ['CaseStudyClient.tsx', caseStudyClientTsx],
      ['MonolithArchitectureExperience.tsx', monolithExpTsx],
      ['SomaCommerceExperience.tsx', somaExpTsx],
      ['KonRestaurantExperience.tsx', konExpTsx],
    ]) {
      assert.ok(
        source.includes('Laboratorio Técnico & Prototipo Funcional'),
        `${name} must present interactive prototype under the seal "Laboratorio Técnico & Prototipo Funcional"`
      );
    }
    assert.ok(
      monolithExpTsx.includes('type="range"'),
      'Monolith case study experience must house the relocated interactive solar azimuth/altitude simulator'
    );

    // 6. Ajuste de la Obsidiana en el Hero: ascenso al centro geométrico/óptico en la intersección ZYRVAE + serif itálica
    assert.ok(
      heroTsx.includes('data-hero-intersection="zyrvae-obsidian-manifesto"'),
      'Obsidian sculpture must be mounted directly at the intersection between ZYRVAE and the Instrument Serif Italic manifesto'
    );

    // 7. Micro-ajustes de cierre de Fase 2:
    // (a) Supresión de la solapa roja flotante (EXPLOR...) en el margen perimetral derecho
    const layoutTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'app', 'layout.tsx'),
      'utf-8'
    );
    const customCursorTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'CustomCursor.tsx'),
      'utf-8'
    );
    assert.equal(
      layoutTsx.includes('<CustomCursor'),
      false,
      'layout.tsx must not mount floating red CustomCursor tab that collides with right perimeter margin'
    );
    assert.ok(
      customCursorTsx.includes('return null;'),
      'CustomCursor must return null to preserve clean perimeter margins'
    );

    // (b) Sincronización de etiquetas de fase a Phase 02 en Header y PerimeterMargins
    const headerTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'Header.tsx'),
      'utf-8'
    );
    const perimeterTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'PerimeterMargins.tsx'),
      'utf-8'
    );
    assert.ok(
      headerTsx.includes('Zyrvae / Phase 02') && headerTsx.includes('[02]'),
      'Header top-left cell must be synchronized to Zyrvae / Phase 02 [02]'
    );
    assert.equal(
      headerTsx.includes('Zyrvae / Phase 1'),
      false,
      'Header must not retain outdated Phase 1 label'
    );
    assert.ok(
      perimeterTsx.includes('Phase 02 — Editorial Sheet') &&
        perimeterTsx.includes('Zyrvae · Monolith Grid [02]'),
      'PerimeterMargins must be synchronized to Phase 02 — Editorial Sheet'
    );
    assert.equal(
      perimeterTsx.includes('Phase 01 — Editorial Sheet'),
      false,
      'PerimeterMargins must not retain outdated Phase 01 — Editorial Sheet label'
    );

    // (c) Coherencia en la numeración del Acto 03 ([Acto 03 // Capacidades & Filosofía])
    assert.ok(
      servicesTsx.includes('[Acto 03 // Capacidades & Filosofía]'),
      'Acto 03 header must use unified label [Acto 03 // Capacidades & Filosofía]'
    );
    assert.equal(
      servicesTsx.includes('02 / Capabilities'),
      false,
      'Acto 03 header must not contain double numeric label 02 / Capabilities'
    );
  });

  test('Fase 3 — Cinemática Visual, Scroll Anclado, WebGL 3D (IOR 2.42), Parallax Multicapa, CAD Grid Drawing y Shared Element Morph', async () => {
    const sculptureTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'ui', 'ObsidianSculpture.tsx'),
      'utf-8'
    );
    const heroTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Hero.tsx'),
      'utf-8'
    );
    const portfolioTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Portfolio.tsx'),
      'utf-8'
    );
    const servicesTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'sections', 'Services.tsx'),
      'utf-8'
    );
    const headerTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'layout', 'Header.tsx'),
      'utf-8'
    );
    const caseStudyClientTsx = fs.readFileSync(
      path.join(process.cwd(), 'src', 'components', 'case-study', 'CaseStudyClient.tsx'),
      'utf-8'
    );

    // 1. Física e interacción de la escultura central (Hero 3D WebGL):
    // - lerp: 0.05, inclinación restringida a ±15° en X y ±25° en Y
    // - Three.js MeshPhysicalMaterial con ior: 2.42, transmission: 1.0, roughness: 0.03 y núcleo #0A0A0C
    // - Levitación continua (0.4 Hz, 6 px) y rotación pasiva (0.15 rad/s)
    assert.ok(sculptureTsx.includes('lerp: 0.05'), 'ObsidianSculpture must use lerp: 0.05 inertial interpolation');
    assert.ok(
      sculptureTsx.includes('maxTiltXDeg: 15') && sculptureTsx.includes('maxTiltYDeg: 25'),
      'ObsidianSculpture must clamp tilt to ±15° on X and ±25° on Y'
    );
    assert.ok(
      sculptureTsx.includes('ior: 2.42') &&
        sculptureTsx.includes('transmission: 1.0') &&
        sculptureTsx.includes('roughness: 0.03') &&
        sculptureTsx.includes('#0A0A0C'),
      'ObsidianSculpture must configure Three.js physical crystal (ior: 2.42, transmission: 1.0, roughness: 0.03) and #0A0A0C obsidian core'
    );
    assert.ok(
      sculptureTsx.includes('levitationFrequencyHz: 0.4') &&
        sculptureTsx.includes('levitationAmplitudePx: 6') &&
        sculptureTsx.includes('passiveRotationRadPerSec: 0.15'),
      'ObsidianSculpture must program 0.4 Hz / 6 px levitation and 0.15 rad/s passive rotation'
    );

    // 2. Scroll anclado (Pinned Scroll Scrubbing) estilo Apple en Hero:
    // - pin: true, scrub: 1 durante 100vh de recorrido
    // - Secuencia en 3 tiempos: (0-35% scale: 0.85 + Z recede), (30-70% y: -40, stagger: 0.08), (60-100% grid release & plate entry)
    assert.ok(
      heroTsx.includes('pin: true') && heroTsx.includes('scrub: 1'),
      'Hero must configure GSAP ScrollTrigger with pin: true and scrub: 1'
    );
    assert.ok(
      heroTsx.includes('scale: 0.85') &&
        heroTsx.includes('y: -40') &&
        heroTsx.includes('stagger: 0.08'),
      'Hero must implement the 3-stage exit scrub sequence (scale: 0.85, y: -40, stagger: 0.08)'
    );

    // 3. Revelado arquitectónico y Parallax multicapa en láminas de proyectos:
    // - clip-path: inset(100% 0 0 0) -> inset(0% 0 0 0) con cubic-bezier(0.16, 1, 0.3, 1)
    // - Fotografía (yPercent: -8, scale: 1.06 -> 1.0) y numeración monumental con factor 0.25x
    assert.ok(
      portfolioTsx.includes('inset(100% 0 0 0)') && portfolioTsx.includes('inset(0% 0 0 0)'),
      'Portfolio plates must reveal via vertical clip-path mask inset(100% 0 0 0) -> inset(0% 0 0 0)'
    );
    assert.ok(
      portfolioTsx.includes('yPercent: -8') &&
        portfolioTsx.includes('scaleFrom: 1.06') &&
        portfolioTsx.includes('watermarkParallaxFactor: 0.25'),
      'Portfolio must apply -8% yPercent / 1.06->1.0 photo parallax and 0.25x watermark parallax'
    );

    // 4. Trazado vivo de líneas de retícula (Grid Line Drawing) en Acto 03:
    // - Horizontales scaleX: 0 -> 1 (origin left), verticales scaleY: 0 -> 1 (origin top), 0.6s, stagger 0.05s
    assert.ok(
      servicesTsx.includes('scaleX: 0') &&
        servicesTsx.includes('scaleX: 1') &&
        servicesTsx.includes('scaleY: 0') &&
        servicesTsx.includes('scaleY: 1') &&
        servicesTsx.includes('durationSec: 0.6') &&
        servicesTsx.includes('cellStaggerSec: 0.05'),
      'Services (Acto 03) must draw 0.5px CAD grid lines with scaleX/scaleY in 0.6s with 0.05s stagger'
    );

    // 5. Transición continua hacia los casos de estudio (Shared Element Morph):
    assert.ok(
      portfolioTsx.includes('layoutId={`case-study-image-${project.slug}`}') &&
        portfolioTsx.includes('layoutId={`case-study-title-${project.slug}`}') &&
        caseStudyClientTsx.includes('layoutId={`case-study-image-${project.slug}`}'),
      'Portfolio and CaseStudyClient must share layoutId for continuous image and title morphing'
    );

    // 6. Microinteracciones de precisión táctil:
    // - Atracción magnética de 4px a < 40px en CONTACT / INQUIRE →
    // - Desplazamiento cinético de 3px en diagonal en la flecha de EXPLORAR CASO DE ESTUDIO ↗
    assert.ok(
      headerTsx.includes('proximityRadiusPx: 40') && headerTsx.includes('maxDisplacementPx: 4'),
      'Header CONTACT / INQUIRE block must implement 4px magnetic attraction within 40px proximity'
    );
    assert.ok(
      portfolioTsx.includes('group-hover/cta:translate-x-[3px]') &&
        portfolioTsx.includes('group-hover/cta:-translate-y-[3px]'),
      'Portfolio CTA arrow must shift 3px diagonally on hover and intensify bottom hairline opacity'
    );

    // 7. Salvaguardas de rendimiento y accesibilidad:
    // - Desactivación de anclaje en móviles (< 768px)
    // - Respeto a prefers-reduced-motion
    // - FPS Throttle (< 50 FPS) a material estático optimizado
    // - Limpieza de memoria WebGL (.dispose()) y observadores de scroll
    assert.ok(
      heroTsx.includes('mobileBreakpointPx: 768'),
      'Hero pinning must be disabled below 768px mobile breakpoint'
    );
    assert.ok(
      sculptureTsx.includes('fpsThrottleThreshold: 50') &&
        sculptureTsx.includes('staticOptimizedMaterial'),
      'ObsidianSculpture must throttle to staticOptimizedMaterial when FPS drops below 50'
    );
    assert.ok(
      sculptureTsx.includes('renderer.dispose()') &&
        sculptureTsx.includes('obsidianGeometry.dispose()') &&
        sculptureTsx.includes('obsidianMaterial.dispose()'),
      'ObsidianSculpture must dispose Three.js geometries, materials, and WebGLRenderer on unmount'
    );
    assert.equal(
      sculptureTsx.includes('new THREE.OctahedronGeometry'),
      false,
      'ObsidianSculpture must not mount OctahedronGeometry ghost diamond over 2K sculpture'
    );
    assert.equal(
      sculptureTsx.includes('new THREE.LineSegments'),
      false,
      'ObsidianSculpture must not mount wireframe LineSegments over 2K sculpture'
    );
    assert.equal(
      sculptureTsx.includes('isCursorIdle'),
      false,
      'ObsidianSculpture must not freeze continuous rotation on pointer movement (no isCursorIdle)'
    );
    assert.ok(
      sculptureTsx.includes('Math.cos(t * 0.5)'),
      'ObsidianSculpture must include Lissajous figure-eight harmonic oscillation (Math.cos(t * 0.5)) on X and Z axes'
    );
    assert.ok(
      portfolioTsx.includes('usePathname') && portfolioTsx.includes('popstate'),
      'Portfolio must reset state on route return via usePathname and popstate listener'
    );
  });
});
