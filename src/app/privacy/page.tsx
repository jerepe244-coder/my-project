import type { Metadata } from 'next';
import { LegalDocumentView } from '@/components/legal/LegalDocumentView';

export const metadata: Metadata = {
  title: 'Política de Privacidad — ZYRVAE Digital Studio',
  description:
    'Política de privacidad y uso exclusivo de datos comerciales ingresados mediante el formulario de contacto de ZYRVAE Digital Studio.',
};

export default function PrivacyPage() {
  return <LegalDocumentView doc="privacy" />;
}
