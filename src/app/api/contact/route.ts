import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const PROJECT_TYPE_LABELS: Record<string, string> = {
  hospitality: 'Hospitalidad & Hoteles Boutique',
  gastronomy: 'Gastronomía de Autor & Restaurantes',
  architecture: 'Estudio de Arquitectura & Obra',
  corporate: 'Marca Corporativa / Identidad Institucional',
  ecommerce: 'E-Commerce / Dispensario Boutique',
  portfolio: 'Portafolio Editorial / Catálogo',
  custom: 'Sistema Digital / Desarrollo a Medida',
};

const BUDGET_LABELS: Record<string, string> = {
  tier1: '$5,000 – $15,000 USD',
  tier2: '$15,000 – $30,000 USD',
  tier3: '$30,000 – $60,000 USD',
  tier4: '+$60,000 USD',
};

const TIMELINE_LABELS: Record<string, string> = {
  urgent: 'Inmediato (4–6 semanas)',
  medium: 'Estándar (6–10 semanas)',
  flexible: 'Exploratorio (3–4 meses)',
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function normalizeString(input: unknown, maxLen: number): string {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    let body: Record<string, unknown>;
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        { ok: false, error: 'INVALID_JSON', message: 'Cuerpo JSON inválido.' },
        { status: 400 }
      );
    }

    // Protección anti-spam por honeypot invisible
    const honeypotValue =
      normalizeString(body.hp_field, 200) ||
      normalizeString(body.website, 200) ||
      normalizeString(body.honeypot, 200);

    if (honeypotValue) {
      return NextResponse.json(
        { ok: false, error: 'SPAM_DETECTED' },
        { status: 400 }
      );
    }

    // Extracción y sanitización estricta de campos
    const cleanName = normalizeString(body.name, 120);
    const cleanEmail = normalizeString(body.email, 180);
    const cleanBrand = normalizeString(body.brand, 140);
    const cleanCountry = normalizeString(body.country, 100);
    const cleanProjectType = normalizeString(body.projectType, 120);
    const cleanMainGoal = normalizeString(body.mainGoal, 240);
    const cleanTargetAudience = normalizeString(body.targetAudience, 240);
    const cleanMessage =
      normalizeString(body.projectDescription, 5000) ||
      normalizeString(body.message, 5000);
    const cleanReferences = normalizeString(body.references, 1000);
    const cleanBudget =
      normalizeString(body.budgetRange, 120) ||
      normalizeString(body.budget, 120);
    const cleanTimeline = normalizeString(body.timeline, 120);
    const cleanNotes = normalizeString(body.additionalNotes, 2000);

    const cleanFeatures = Array.isArray(body.features)
      ? body.features
          .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
          .map((item) => item.trim().slice(0, 120))
          .slice(0, 16)
      : [];

    // Validación estricta: nombre, email, tipo de proyecto, presupuesto y mensaje
    const fieldErrors: Record<string, string> = {};
    if (cleanName.length < 2) {
      fieldErrors.name = 'El nombre debe contener al menos 2 caracteres.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      fieldErrors.email = 'El correo electrónico ingresado no es válido.';
    }

    if (!cleanProjectType) {
      fieldErrors.projectType = 'Seleccioná el tipo de proyecto.';
    }

    if (!cleanBudget) {
      fieldErrors.budgetRange = 'Seleccioná un rango de presupuesto.';
    }

    if (cleanMessage.length < 5) {
      fieldErrors.projectDescription = 'El mensaje o descripción debe contener al menos 5 caracteres.';
    }

    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json(
        {
          ok: false,
          error: 'VALIDATION_FAILED',
          message: Object.values(fieldErrors)[0],
          fields: fieldErrors,
        },
        { status: 422 }
      );
    }

    const projectTypeLabel = PROJECT_TYPE_LABELS[cleanProjectType] || cleanProjectType;
    const budgetLabel = BUDGET_LABELS[cleanBudget] || cleanBudget;
    const timelineLabel = TIMELINE_LABELS[cleanTimeline] || cleanTimeline || 'No especificado';
    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'zyrvae.co@gmail.com';
    const submittedAt = new Date().toISOString();

    const briefSummaryText = [
      'ZYRVAE DIGITAL STUDIO — NUEVO BRIEF DE PROYECTO',
      '================================================',
      '',
      '01. CONTACTO',
      `- Nombre: ${cleanName}`,
      `- Email: ${cleanEmail}`,
      `- Marca / Empresa: ${cleanBrand || 'No especificada'}`,
      `- País / Ciudad: ${cleanCountry || 'No especificado'}`,
      '',
      '02. PROYECTO',
      `- Tipo de proyecto: ${projectTypeLabel}`,
      `- Objetivo principal: ${cleanMainGoal || 'No especificado'}`,
      `- Público objetivo: ${cleanTargetAudience || 'No especificado'}`,
      `- Funcionalidades: ${cleanFeatures.length > 0 ? cleanFeatures.join(', ') : 'Ninguna seleccionada'}`,
      '- Mensaje / Descripción:',
      cleanMessage,
      `- Referencias: ${cleanReferences || 'Ninguna'}`,
      '',
      '03. ALCANCE Y CRONOGRAMA',
      `- Presupuesto estimado: ${budgetLabel}`,
      `- Plazo deseado: ${timelineLabel}`,
      `- Notas adicionales: ${cleanNotes || 'Ninguna'}`,
      '',
      `Timestamp UTC: ${submittedAt}`,
    ].join('\n');

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn(
        'ZYRVAE /api/contact: RESEND_API_KEY is not configured in environment variables.'
      );
      return NextResponse.json(
        {
          ok: false,
          error: 'CONFIG_PENDING',
          message:
            'El servicio de correo transaccional requiere configurar RESEND_API_KEY en el servidor. Tu brief quedó validado y podés enviarlo directamente a zyrvae.co@gmail.com.',
          briefText: briefSummaryText,
          recipient,
        },
        { status: 503 }
      );
    }

    const emailHtml = `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nuevo Brief — ZYRVAE Digital Studio</title>
  </head>
  <body style="margin:0;padding:24px;background-color:#EFEFEA;color:#0A0A0C;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;margin:0 auto;background-color:#FFFFFF;border:1px solid #D8D6CE;">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #D8D6CE;background-color:#0A0A0C;color:#EFEFEA;">
          <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#FF3B30;font-weight:600;">
            ZYRVAE Digital Studio · Expediente Comercial
          </p>
          <h1 style="margin:0;font-size:22px;line-height:1.2;font-weight:700;color:#EFEFEA;">
            Nuevo Brief de Proyecto: ${escapeHtml(cleanBrand || cleanName)}
          </h1>
        </td>
      </tr>

      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #D8D6CE;">
          <h2 style="margin:0 0 14px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#4A4D52;">
            01 / Información de contacto
          </h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:13px;line-height:1.5;border-collapse:collapse;">
            <tr>
              <td style="padding:7px 0;color:#4A4D52;width:150px;border-bottom:1px solid #ECEAE4;">Nombre</td>
              <td style="padding:7px 0;color:#0A0A0C;font-weight:600;border-bottom:1px solid #ECEAE4;">${escapeHtml(cleanName)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Email</td>
              <td style="padding:7px 0;border-bottom:1px solid #ECEAE4;">
                <a href="mailto:${escapeHtml(cleanEmail)}" style="color:#FF3B30;text-decoration:none;font-weight:600;">${escapeHtml(cleanEmail)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Marca / Estudio</td>
              <td style="padding:7px 0;color:#0A0A0C;border-bottom:1px solid #ECEAE4;">${escapeHtml(cleanBrand || 'No especificada')}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;">País / Ciudad</td>
              <td style="padding:7px 0;color:#0A0A0C;">${escapeHtml(cleanCountry || 'No especificado')}</td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid #D8D6CE;">
          <h2 style="margin:0 0 14px 0;font-size:12px;letter-spacing:0.06em;text-transform:uppercase;color:#4A4D52;">
            02 / Especificación y mensaje
          </h2>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:13px;line-height:1.5;border-collapse:collapse;">
            <tr>
              <td style="padding:7px 0;color:#4A4D52;width:150px;border-bottom:1px solid #ECEAE4;">Tipo de proyecto</td>
              <td style="padding:7px 0;color:#0A0A0C;font-weight:600;border-bottom:1px solid #ECEAE4;">${escapeHtml(projectTypeLabel)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Presupuesto</td>
              <td style="padding:7px 0;color:#0A0A0C;font-weight:600;border-bottom:1px solid #ECEAE4;">${escapeHtml(budgetLabel)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Plazo estimado</td>
              <td style="padding:7px 0;color:#0A0A0C;border-bottom:1px solid #ECEAE4;">${escapeHtml(timelineLabel)}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Objetivo principal</td>
              <td style="padding:7px 0;color:#0A0A0C;border-bottom:1px solid #ECEAE4;">${escapeHtml(cleanMainGoal || 'No especificado')}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Audiencia</td>
              <td style="padding:7px 0;color:#0A0A0C;border-bottom:1px solid #ECEAE4;">${escapeHtml(cleanTargetAudience || 'No especificada')}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;border-bottom:1px solid #ECEAE4;">Funcionalidades</td>
              <td style="padding:7px 0;color:#0A0A0C;border-bottom:1px solid #ECEAE4;">${escapeHtml(cleanFeatures.length > 0 ? cleanFeatures.join(', ') : 'Ninguna seleccionada')}</td>
            </tr>
            <tr>
              <td style="padding:7px 0;color:#4A4D52;">Referencias</td>
              <td style="padding:7px 0;color:#0A0A0C;">${escapeHtml(cleanReferences || 'Ninguna')}</td>
            </tr>
          </table>

          <div style="margin-top:16px;padding:16px;background-color:#F8F8F5;border-left:2px solid #FF3B30;">
            <p style="margin:0 0 6px 0;font-size:11px;font-weight:600;color:#4A4D52;text-transform:uppercase;">
              Mensaje del cliente
            </p>
            <p style="margin:0;font-size:13px;line-height:1.6;color:#0A0A0C;">
              ${escapeHtml(cleanMessage).replace(/\n/g, '<br/>')}
            </p>
          </div>

          ${
            cleanNotes
              ? `<div style="margin-top:12px;padding:12px 16px;background-color:#F8F8F5;border:1px solid #ECEAE4;">
                  <p style="margin:0 0 4px 0;font-size:11px;font-weight:600;color:#4A4D52;">Notas adicionales</p>
                  <p style="margin:0;font-size:12px;line-height:1.5;color:#0A0A0C;">${escapeHtml(cleanNotes).replace(/\n/g, '<br/>')}</p>
                </div>`
              : ''
          }
        </td>
      </tr>

      <tr>
        <td style="padding:16px 28px;background-color:#EFEFEA;font-size:11px;color:#4A4D52;">
          Respondé directamente a este correo para contactar a ${escapeHtml(cleanName)} (${escapeHtml(cleanEmail)}). · UTC ${escapeHtml(submittedAt)}
        </td>
      </tr>
    </table>
  </body>
</html>
    `.trim();

    const resend = new Resend(resendApiKey);
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'ZYRVAE Studio <onboarding@resend.dev>',
      to: [recipient],
      replyTo: cleanEmail,
      subject: `[Nuevo Brief] ${cleanBrand || cleanName} — ${projectTypeLabel}`,
      text: briefSummaryText,
      html: emailHtml,
    });

    if (resendError) {
      console.error('Resend API dispatch error:', resendError);
      return NextResponse.json(
        {
          ok: false,
          error: 'EXTERNAL_DISPATCH_FAILED',
          message:
            resendError.message ||
            'El proveedor de correo rechazó temporalmente la solicitud. Podés reintentar o copiar tu brief.',
          briefText: briefSummaryText,
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      ok: true,
      id: resendData?.id ?? null,
      recipient,
      message: 'Brief transmitido correctamente a zyrvae.co@gmail.com.',
    });
  } catch (error) {
    console.error('API Contact route error:', error);
    return NextResponse.json(
      { ok: false, error: 'INTERNAL_SERVER_ERROR', message: 'Error interno al procesar el brief.' },
      { status: 500 }
    );
  }
}
