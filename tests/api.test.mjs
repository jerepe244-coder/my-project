import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('Contact Form API Route Tests', () => {
  test('Contact API handles validation and honest dispatch state', async () => {
    const { POST } = await import('../src/app/api/contact/route.ts');

    // 1. Spam honeypot detection
    const spamReq = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hp_field: 'spam-bot-input',
        name: 'Spam Bot',
        email: 'bot@spam.com',
      }),
    });

    const spamRes = await POST(spamReq);
    assert.equal(spamRes.status, 400);
    const spamData = await spamRes.json();
    assert.equal(spamData.error, 'SPAM_DETECTED');

    // 2. Missing required fields
    const missingReq = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Carlos',
        email: 'carlos@example.com',
        // Missing brand, country, projectType, etc.
      }),
    });

    const missingRes = await POST(missingReq);
    assert.equal(missingRes.status, 422);
    const missingData = await missingRes.json();
    assert.equal(missingData.error, 'MISSING_REQUIRED_FIELDS');

    // 3. Invalid email format
    const invalidEmailReq = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Carlos Perez',
        email: 'invalid-email-string',
        brand: 'Studio Alpha',
        country: 'Argentina',
        projectType: 'hospitality',
        mainGoal: 'New website',
        projectDescription: 'Full redesign',
        budgetRange: 'tier2',
        timeline: 'medium',
      }),
    });

    const invalidEmailRes = await POST(invalidEmailReq);
    assert.equal(invalidEmailRes.status, 422);
    const invalidEmailData = await invalidEmailRes.json();
    assert.equal(invalidEmailData.error, 'INVALID_EMAIL');

    // 4. Valid payload without RESEND_API_KEY returns CONFIG_PENDING (honest status)
    const validReq = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Camila Diaz',
        email: 'camila@boutiquehotel.com',
        brand: 'Lodge del Valle',
        country: 'Chile',
        projectType: 'hospitality',
        mainGoal: 'Direct bookings and high-end visual showcase',
        targetAudience: 'International travelers',
        features: ['Direct booking', 'Room inspector'],
        projectDescription: 'We are opening a 12-suite boutique hotel in 4 months.',
        references: 'https://example.com',
        budgetRange: 'tier3',
        timeline: 'medium',
        additionalNotes: 'Ready to start immediately.',
      }),
    });

    const validRes = await POST(validReq);
    assert.equal(validRes.status, 503);
    const validData = await validRes.json();
    assert.equal(validData.ok, false);
    assert.equal(validData.error, 'CONFIG_PENDING');
    assert.ok(validData.briefText.includes('Lodge del Valle'));
    assert.ok(validData.briefText.includes('camila@boutiquehotel.com'));
    assert.equal(validData.recipient, 'zyrvae.co@gmail.com');
  });
});
