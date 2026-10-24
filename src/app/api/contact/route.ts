import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      brand,
      country,
      projectType,
      mainGoal,
      targetAudience,
      features,
      projectDescription,
      references,
      budgetRange,
      timeline,
      additionalNotes,
      hp_field, // Honeypot spam prevention
    } = body;

    // Honeypot check
    if (hp_field) {
      return NextResponse.json(
        { ok: false, error: 'SPAM_DETECTED' },
        { status: 400 }
      );
    }

    // Required fields validation
    if (
      !name?.trim() ||
      !email?.trim() ||
      !brand?.trim() ||
      !country?.trim() ||
      !projectType?.trim() ||
      !mainGoal?.trim() ||
      !projectDescription?.trim() ||
      !budgetRange?.trim() ||
      !timeline?.trim()
    ) {
      return NextResponse.json(
        { ok: false, error: 'MISSING_REQUIRED_FIELDS' },
        { status: 422 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { ok: false, error: 'INVALID_EMAIL' },
        { status: 422 }
      );
    }

    const recipient = process.env.CONTACT_NOTIFICATION_EMAIL || 'zyrvae.co@gmail.com';
    const resendApiKey = process.env.RESEND_API_KEY;

    // Build the formatted brief text
    const briefSummaryText = `
========================================
ZYRVAE DIGITAL STUDIO — NUEVO BRIEF DE PROYECTO
========================================

01. INFORMACIÓN DEL CONTACTO
- Nombre: ${name}
- Email: ${email}
- Marca / Empresa: ${brand}
- País: ${country}

02. DETALLES DEL PROYECTO
- Tipo de proyecto: ${projectType}
- Objetivo principal: ${mainGoal}
- Público objetivo: ${targetAudience || 'No especificado'}
- Funcionalidades deseadas: ${Array.isArray(features) && features.length > 0 ? features.join(', ') : 'Ninguna seleccionada'}
- Descripción del proyecto:
${projectDescription}
- Referencias visuales o técnicas: ${references || 'Ninguna'}

03. ALCANCE & CRONOGRAMA
- Rango de presupuesto: ${budgetRange}
- Fecha estimada de lanzamiento: ${timeline}
- Notas adicionales: ${additionalNotes || 'Ninguna'}

Destinatario objetivo: ${recipient}
Timestamp: ${new Date().toISOString()}
========================================
    `.trim();

    // If RESEND_API_KEY is configured in server environment, dispatch real email
    if (resendApiKey) {
      const fromEmail = process.env.EMAIL_FROM || 'ZYRVAE Inquiries <onboarding@resend.dev>';

      const emailPayload = {
        from: fromEmail,
        to: [recipient],
        reply_to: email,
        subject: `[Nuevo Brief] ${brand} — ${projectType}`,
        text: briefSummaryText,
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #0c0d10; color: #f4f5f8; padding: 24px; border-radius: 8px;">
            <h2 style="color: #0a5cff; border-bottom: 1px solid #1e222b; padding-bottom: 12px; margin-top: 0;">ZYRVAE Digital Studio — Nuevo Brief de Proyecto</h2>
            <h3 style="color: #cbd4e6; margin-top: 20px;">01. Contacto</h3>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #0a5cff;">${email}</a></p>
            <p><strong>Marca/Empresa:</strong> ${brand}</p>
            <p><strong>País:</strong> ${country}</p>
            <h3 style="color: #cbd4e6; margin-top: 20px;">02. Proyecto</h3>
            <p><strong>Tipo:</strong> ${projectType}</p>
            <p><strong>Objetivo:</strong> ${mainGoal}</p>
            <p><strong>Público:</strong> ${targetAudience || 'No especificado'}</p>
            <p><strong>Funcionalidades:</strong> ${Array.isArray(features) && features.length > 0 ? features.join(', ') : 'Ninguna seleccionada'}</p>
            <p><strong>Descripción:</strong><br/>${projectDescription.replace(/\n/g, '<br/>')}</p>
            <p><strong>Referencias:</strong> ${references || 'Ninguna'}</p>
            <h3 style="color: #cbd4e6; margin-top: 20px;">03. Alcance</h3>
            <p><strong>Presupuesto:</strong> ${budgetRange}</p>
            <p><strong>Plazo deseado:</strong> ${timeline}</p>
            <p><strong>Notas:</strong> ${additionalNotes || 'Ninguna'}</p>
          </div>
        `,
      };

      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error('Error dispatching via Resend:', errorData);
        return NextResponse.json(
          {
            ok: false,
            error: 'EXTERNAL_DISPATCH_FAILED',
            details: errorData,
            briefText: briefSummaryText,
          },
          { status: 502 }
        );
      }

      const resendData = await resendResponse.json();
      return NextResponse.json({
        ok: true,
        id: resendData.id,
        recipient,
        message: 'Brief successfully transmitted to zyrvae.co@gmail.com',
      });
    }

    // If RESEND_API_KEY is not configured yet, report explicit status without fake submission
    console.warn(
      'ZYRVAE Contact Form API: RESEND_API_KEY environment variable is not defined. Email dispatch pending external configuration.'
    );

    return NextResponse.json(
      {
        ok: false,
        error: 'CONFIG_PENDING',
        message:
          'El servicio de envío automático requiere la configuración de la variable de entorno RESEND_API_KEY. Los datos se han verificado correctamente.',
        briefText: briefSummaryText,
        recipient,
      },
      { status: 503 }
    );
  } catch (error) {
    console.error('API Contact route error:', error);
    return NextResponse.json(
      { ok: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 }
    );
  }
}
