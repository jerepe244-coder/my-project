import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { ContactForm } from '@/components/sections/ContactForm';

/**
 * ESTRUCTURA FIJA EN 4 ACTOS (FASE 2 — FIN DE LA FATIGA DE SCROLL):
 * - Acto 1: Hero monumental con la escultura de obsidiana en el centro óptico (<Hero />)
 * - Acto 2: Selección de obras en láminas editoriales a sangre (<Portfolio />)
 * - Acto 3: Cuadrícula de capacidades y filosofía del estudio en 4 columnas (<Services />)
 * - Acto 4: Contacto directo y firma editorial en el pie de página (<ContactForm /> + <Footer />)
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <ContactForm />
    </>
  );
}
