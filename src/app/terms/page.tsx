import type { Metadata } from 'next';
import { LegalDocumentView } from '@/components/legal/LegalDocumentView';

export const metadata: Metadata = {
  title: 'Términos y Condiciones — ZYRVAE Digital Studio',
  description:
    'Términos legales, aclaración conceptual de casos de estudio del portafolio y jurisdicción aplicable a ZYRVAE Digital Studio en Buenos Aires, Argentina.',
};

export default function TermsPage() {
  return <LegalDocumentView doc="terms" />;
}
