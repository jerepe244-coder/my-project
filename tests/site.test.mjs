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
});
