'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface LegalClause {
  number: string;
  title: string;
  paragraphs: string[];
}

interface LegalDocContent {
  indexCode: string;
  breadcrumbLabel: string;
  title: string;
  subtitle: string;
  updatedLabel: string;
  updatedValue: string;
  jurisdictionLabel: string;
  jurisdictionValue: string;
  siblingHref: string;
  siblingLabel: string;
  clauses: LegalClause[];
}

const LEGAL_COPY: Record<'terms' | 'privacy', Record<'es' | 'en', LegalDocContent>> = {
  terms: {
    es: {
      indexCode: '01 / Términos y Condiciones',
      breadcrumbLabel: 'Marco Legal · ZYRVAE Digital Studio',
      title: 'TÉRMINOS Y CONDICIONES',
      subtitle:
        'Régimen conceptual del portafolio interactivo, propiedad intelectual y jurisdicción aplicable al estudio.',
      updatedLabel: 'Última actualización',
      updatedValue: 'Edición 2026',
      jurisdictionLabel: 'Jurisdicción aplicable',
      jurisdictionValue: 'Buenos Aires, Argentina',
      siblingHref: '/privacy',
      siblingLabel: 'Política de Privacidad',
      clauses: [
        {
          number: '01',
          title: 'Identificación del estudio y alcance del sitio',
          paragraphs: [
            'El presente sitio web es operado por ZYRVAE Digital Studio («ZYRVAE»), estudio independiente de arquitectura digital, dirección de arte e ingeniería web con base en la Ciudad Autónoma de Buenos Aires, República Argentina.',
            'El acceso y la navegación por zyrvae.com y sus subrutas implican la aceptación plena de estos Términos y Condiciones por parte del usuario o representante de marca.',
          ],
        },
        {
          number: '02',
          title: 'Naturaleza conceptual y demostrativa de los casos de estudio',
          paragraphs: [
            'Se deja constancia expresa de que los casos de estudio interactivos exhibidos en este portafolio —específicamente Aura Sanctuary, Kôn Atelier, Monolith Studio (anteriormente referenciado como Vectra Architects) y Sōma Formulations— constituyen prototipos conceptuales demostrativos desarrollados íntegramente por ZYRVAE.',
            'Dichas experiencias interactivas existen con fines exclusivos de exhibición técnica y diseño de producto digital. No representan establecimientos hoteleros, restaurantes, estudios de arquitectura ni comercios reales actualmente en operación comercial.',
            'En consecuencia, los flujos interactivos contenidos dentro de los casos de estudio (simuladores de estadía, solicitudes de mesa, estudios solares, dispensarios, carritos de compra o formularios de pago demostrativos) no procesan transacciones reales, no generan reservas válidas frente a terceros ni efectúan cargos financieros reales.',
          ],
        },
        {
          number: '03',
          title: 'Propiedad intelectual e industrial',
          paragraphs: [
            'La totalidad del diseño visual, la arquitectura tipográfica, los textos editoriales, las identidades conceptuales, las piezas gráficas, los renders 3D, los shaders WebGL y el código fuente contenidos en este sitio son propiedad intelectual exclusiva de ZYRVAE Digital Studio.',
            'Queda prohibida la reproducción total o parcial, redistribución, ingeniería inversa o apropiación comercial de los activos, interfaces o prototipos aquí publicados sin autorización previa y por escrito del estudio.',
          ],
        },
        {
          number: '04',
          title: 'Solicitudes comerciales y propuestas',
          paragraphs: [
            'La información enviada mediante el formulario de contacto oficial (/api/contact) tiene carácter de consulta preliminar y no constituye una oferta contractual vinculante ni reserva de agenda automática. Todo encargo de diseño o desarrollo se formaliza mediante acuerdo de servicios específico y cronograma firmado por ambas partes.',
          ],
        },
        {
          number: '05',
          title: 'Limitación de responsabilidad',
          paragraphs: [
            'ZYRVAE procura la máxima estabilidad, seguridad y disponibilidad técnica del sitio; no obstante, no garantiza la ausencia absoluta de interrupciones temporales de red o mantenimiento. El estudio no será responsable por daños indirectos derivados de interpretaciones erróneas sobre el carácter conceptual de las obras exhibidas.',
          ],
        },
        {
          number: '06',
          title: 'Ley aplicable y jurisdicción competente',
          paragraphs: [
            'Estos Términos y Condiciones se rigen e interpretan conforme a las leyes vigentes de la República Argentina. Ante cualquier controversia derivada de la utilización del sitio, las partes se someten expresamente a la jurisdicción ordinaria de los tribunales competentes de la Ciudad Autónoma de Buenos Aires, Argentina, renunciando a cualquier otro fuero o jurisdicción.',
          ],
        },
      ],
    },
    en: {
      indexCode: '01 / Terms & Conditions',
      breadcrumbLabel: 'Legal Framework · ZYRVAE Digital Studio',
      title: 'TERMS & CONDITIONS',
      subtitle:
        'Conceptual status of interactive portfolio case studies, intellectual property ownership, and governing jurisdiction.',
      updatedLabel: 'Last updated',
      updatedValue: '2026 Edition',
      jurisdictionLabel: 'Governing jurisdiction',
      jurisdictionValue: 'Buenos Aires, Argentina',
      siblingHref: '/privacy',
      siblingLabel: 'Privacy Policy',
      clauses: [
        {
          number: '01',
          title: 'Studio identification & scope',
          paragraphs: [
            'This website is operated by ZYRVAE Digital Studio (“ZYRVAE”), an independent digital architecture, art direction, and web engineering practice based in Buenos Aires, Argentina.',
            'Accessing and browsing zyrvae.com and its subroutes constitutes full acceptance of these Terms & Conditions.',
          ],
        },
        {
          number: '02',
          title: 'Conceptual nature of portfolio case studies',
          paragraphs: [
            'ZYRVAE expressly clarifies that all interactive portfolio case studies showcased on this platform — specifically Aura Sanctuary, Kôn Atelier, Monolith Studio (formerly Vectra Architects), and Sōma Formulations — are conceptual demonstrative prototypes conceived and engineered internally by ZYRVAE.',
            'These interactive environments are presented solely to demonstrate digital craftsmanship, spatial interfaces, and front-end/WebGL engineering. They are not operating hotels, restaurants, architecture firms, or retail businesses in commercial operation.',
            'Accordingly, simulated flows inside the case studies (booking requests, tasting menus, solar studies, product bags, or checkout slips) are strictly functional demonstrations: no real bookings, commercial orders, shipping dispatches, or financial charges occur.',
          ],
        },
        {
          number: '03',
          title: 'Intellectual property rights',
          paragraphs: [
            'All visual systems, editorial layouts, typography compositions, 3D geometry, WebGL shaders, photographic directions, copywriting, and source code displayed across this website remain the exclusive intellectual property of ZYRVAE Digital Studio.',
            'Unauthorized reproduction, redistribution, scraping, or commercial reuse of any interface, asset, or codebase from this portfolio is strictly prohibited without prior written consent from ZYRVAE.',
          ],
        },
        {
          number: '04',
          title: 'Commercial inquiries & project briefs',
          paragraphs: [
            'Submitting a project brief through the studio inquiry form represents an exploratory commercial conversation and does not establish an automatic binding contract. Client engagements are governed exclusively by dedicated service agreements signed by both parties.',
          ],
        },
        {
          number: '05',
          title: 'Limitation of liability',
          paragraphs: [
            'While ZYRVAE maintains high technical availability and standards, the studio provides this portfolio “as is” without liability for temporary network outages or third-party misconceptions regarding the conceptual nature of portfolio showcases.',
          ],
        },
        {
          number: '06',
          title: 'Governing law & jurisdiction',
          paragraphs: [
            'These Terms & Conditions are governed by the laws of the Argentine Republic. Any dispute arising out of or related to this website shall be submitted exclusively to the competent ordinary courts of the Autonomous City of Buenos Aires, Argentina.',
          ],
        },
      ],
    },
  },
  privacy: {
    es: {
      indexCode: '02 / Política de Privacidad',
      breadcrumbLabel: 'Protección de Datos · ZYRVAE Digital Studio',
      title: 'POLÍTICA DE PRIVACIDAD',
      subtitle:
        'Tratamiento estricto y confidencial de los datos ingresados en las consultas comerciales de ZYRVAE.',
      updatedLabel: 'Última actualización',
      updatedValue: 'Edición 2026',
      jurisdictionLabel: 'Marco normativo',
      jurisdictionValue: 'Ley 25.326 · Buenos Aires, Argentina',
      siblingHref: '/terms',
      siblingLabel: 'Términos y Condiciones',
      clauses: [
        {
          number: '01',
          title: 'Responsable del tratamiento y compromiso de confidencialidad',
          paragraphs: [
            'ZYRVAE Digital Studio, con domicilio operativo en Buenos Aires, Argentina y correo electrónico de contacto zyrvae.co@gmail.com, asume la responsabilidad directa por la custodia y confidencialidad de los datos personales recibidos a través de este sitio web.',
          ],
        },
        {
          number: '02',
          title: 'Datos recopilados voluntariamente',
          paragraphs: [
            'El sitio únicamente recopila los datos que el usuario ingresa de forma expresa y voluntaria en el formulario de brief o consulta comercial: nombre completo, dirección de correo electrónico, nombre de la marca o estudio, país, tipología de proyecto, rango de presupuesto estimado, objetivos y mensaje descriptivo.',
            'Ninguno de los prototipos demostrativos del portafolio (Aura Sanctuary, Kôn Atelier, Monolith Studio y Sōma Formulations) almacena información de pago real ni historiales de compra externos en bases de datos comerciales.',
          ],
        },
        {
          number: '03',
          title: 'Uso exclusivo de la información',
          paragraphs: [
            'La información proporcionada en el formulario de contacto se utiliza de manera exclusiva para analizar el alcance de tu proyecto, responder a tu consulta comercial, coordinar entrevistas iniciales y preparar propuestas técnicas o de diseño para tu marca.',
            'Bajo ninguna circunstancia enviaremos publicidad masiva no solicitada ni integraremos tus datos en campañas automatizadas de prospección.',
          ],
        },
        {
          number: '04',
          title: 'Cero venta o cesión a terceros',
          paragraphs: [
            'ZYRVAE no vende, alquila, intercambia ni comercializa datos personales bajo ningún concepto con terceros, corredores de datos o redes publicitarias.',
            'Para el despacho técnico seguro del formulario hacia la casilla oficial del estudio (zyrvae.co@gmail.com), la solicitud viaja cifrada mediante protocolo HTTPS utilizando infraestructura transaccional dedicada (Resend) exclusivamente para entregar el mensaje solicitado.',
          ],
        },
        {
          number: '05',
          title: 'Preferencias locales de interfaz',
          paragraphs: [
            'Con el único fin de recordar tu preferencia visual (modo claro/oscuro) e idioma seleccionado durante tu visita, el sitio utiliza almacenamiento local estrictamente técnico en el navegador (`localStorage`). No utilizamos cookies de seguimiento publicitario de terceros.',
          ],
        },
        {
          number: '06',
          title: 'Derechos de acceso, rectificación y supresión',
          paragraphs: [
            'En cumplimiento de la Ley N.º 25.326 de Protección de Datos Personales de la República Argentina y estándares internacionales equivalentes, podés solicitar en cualquier momento el acceso, la rectificación o la eliminación definitiva de tu registro comercial escribiendo directamente a zyrvae.co@gmail.com.',
          ],
        },
      ],
    },
    en: {
      indexCode: '02 / Privacy Policy',
      breadcrumbLabel: 'Data Stewardship · ZYRVAE Digital Studio',
      title: 'PRIVACY POLICY',
      subtitle:
        'Strict purpose limitation and confidentiality governing contact brief submissions to ZYRVAE.',
      updatedLabel: 'Last updated',
      updatedValue: '2026 Edition',
      jurisdictionLabel: 'Applicable framework',
      jurisdictionValue: 'Law 25.326 · Buenos Aires, Argentina',
      siblingHref: '/terms',
      siblingLabel: 'Terms & Conditions',
      clauses: [
        {
          number: '01',
          title: 'Data controller & confidentiality commitment',
          paragraphs: [
            'ZYRVAE Digital Studio, operating from Buenos Aires, Argentina (direct contact: zyrvae.co@gmail.com), acts as sole steward responsible for the confidentiality and proper handling of inquiry data submitted through this website.',
          ],
        },
        {
          number: '02',
          title: 'Information voluntarily collected',
          paragraphs: [
            'ZYRVAE collects solely the information you voluntarily provide inside the project brief / contact form: full name, business email address, brand or company name, country, project category, estimated budget range, objectives, and project message.',
            'Interactive portfolio case studies (Aura Sanctuary, Kôn Atelier, Monolith Studio, and Sōma Formulations) operate purely as front-end prototypes and do not collect financial cards or real consumer purchase records.',
          ],
        },
        {
          number: '03',
          title: 'Exclusive commercial purpose',
          paragraphs: [
            'All data submitted through our inquiry form is used exclusively to review your project requirements, respond directly to your commercial inquiry, and prepare tailored architectural or engineering proposals.',
            'We do not enroll inquiry contacts in unsolicited newsletter drips or automated marketing sequences.',
          ],
        },
        {
          number: '04',
          title: 'No sale or transfer to third parties',
          paragraphs: [
            'ZYRVAE never sells, rents, trades, or shares personal contact records with data brokers, ad networks, or external commercial third parties.',
            'Inquiry payloads are transmitted over encrypted HTTPS via transactional email delivery infrastructure (Resend) strictly to route your brief directly to the studio inbox at zyrvae.co@gmail.com.',
          ],
        },
        {
          number: '05',
          title: 'Browser preferences & zero ad tracking',
          paragraphs: [
            'To preserve your selected color theme (light/dark) and language preference between visits, this site stores lightweight technical flags in browser local storage (`localStorage`). No third-party advertising trackers or behavioral retargeting cookies are deployed.',
          ],
        },
        {
          number: '06',
          title: 'Rights of access, correction & deletion',
          paragraphs: [
            'Consistent with Argentine Personal Data Protection Law No. 25.326 and equivalent international principles, you may request access, correction, or complete deletion of any correspondence or brief sent to the studio at any time by writing to zyrvae.co@gmail.com.',
          ],
        },
      ],
    },
  },
};

export const LegalDocumentView: React.FC<{ doc: 'terms' | 'privacy' }> = ({ doc }) => {
  const { language } = useLanguage();
  const content = LEGAL_COPY[doc][language];

  return (
    <div className="min-h-screen bg-zy-bg text-zy-fg pt-[56px] sm:pt-[60px] pb-16 sm:pb-24 font-sans rounded-none">
      {/* Sub-header continuo de retícula 0.5px */}
      <div className="border-b border-zy-grid-line monolith-hairline bg-zy-bg">
        <div className="px-4 sm:px-8 lg:px-10 h-12 flex items-center justify-between gap-4 text-xs font-medium text-zy-muted tabular-nums">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 hover:text-zy-fg transition-colors pr-4 border-r border-zy-grid-line monolith-hairline h-full shrink-0"
          >
            <ArrowLeft size={13} />
            <span>{language === 'es' ? 'Volver a Zyrvae' : 'Back to Zyrvae'}</span>
          </Link>

          <span className="hidden md:inline text-zy-fg truncate">{content.indexCode}</span>

          <Link
            href={content.siblingHref}
            className="inline-flex items-center space-x-1.5 text-zy-fg hover:text-[#FF3B30] transition-colors shrink-0"
          >
            <span>{content.siblingLabel}</span>
            <ArrowUpRight size={12} className="text-[#FF3B30]" />
          </Link>
        </div>
      </div>

      {/* Cabecera editorial */}
      <header className="px-4 sm:px-8 lg:px-10 py-12 sm:py-16 border-b border-zy-grid-line monolith-hairline">
        <div className="max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center gap-3 font-editorial-micro text-[10px] font-medium text-zy-muted">
            <span className="text-[#FF3B30]">[{doc === 'terms' ? '01' : '02'}]</span>
            <span>{content.breadcrumbLabel}</span>
          </div>

          <h1 className="font-monument font-black uppercase text-4xl sm:text-6xl lg:text-7xl tracking-[-0.04em] leading-[0.88] text-zy-fg">
            {content.title}
          </h1>

          <p className="font-serif-editorial italic text-xl sm:text-2xl text-zy-fg/90 max-w-3xl leading-[1.3]">
            {content.subtitle}
          </p>

          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 border-t border-zy-grid-line monolith-hairline gap-4 text-xs tabular-nums">
            <div className="pt-2 flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="text-zy-muted">{content.updatedLabel}:</span>
              <span className="font-medium text-zy-fg">{content.updatedValue}</span>
            </div>
            <div className="pt-2 flex items-center justify-between sm:justify-start sm:gap-4">
              <span className="text-zy-muted">{content.jurisdictionLabel}:</span>
              <span className="font-medium text-zy-fg">{content.jurisdictionValue}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Cláusulas en retícula suiza 0.5px */}
      <div className="divide-y divide-zy-grid-line border-b border-zy-grid-line monolith-hairline">
        {content.clauses.map((clause) => (
          <section
            key={clause.number}
            className="px-4 sm:px-8 lg:px-10 py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
          >
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-medium text-[#FF3B30] tabular-nums block">
                {clause.number} /
              </span>
              <h2 className="text-lg sm:text-xl font-swiss font-semibold tracking-tight text-zy-fg leading-snug">
                {clause.title}
              </h2>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {clause.paragraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base font-sans text-zy-fg-secondary leading-relaxed max-w-3xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Pie de documento y enlace directo */}
      <div className="px-4 sm:px-8 lg:px-10 pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <a
          href="mailto:zyrvae.co@gmail.com"
          className="inline-flex items-center space-x-2 text-zy-fg hover:text-[#FF3B30] font-medium transition-colors"
        >
          <Mail size={13} className="text-[#FF3B30]" />
          <span>zyrvae.co@gmail.com</span>
        </a>

        <div className="flex items-center space-x-6 text-zy-muted">
          <Link href={content.siblingHref} className="hover:text-zy-fg transition-colors">
            {content.siblingLabel}
          </Link>
          <Link href="/#contact" className="text-zy-fg hover:text-[#FF3B30] font-medium transition-colors">
            {language === 'es' ? 'Iniciar consulta' : 'Start inquiry'} →
          </Link>
        </div>
      </div>
    </div>
  );
};
