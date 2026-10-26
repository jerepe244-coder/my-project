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
});
