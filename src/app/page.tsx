import { Hero } from '@/components/sections/Hero';
import { Portfolio } from '@/components/sections/Portfolio';
import { Services } from '@/components/sections/Services';
import { Process } from '@/components/sections/Process';
import { Studio } from '@/components/sections/Studio';
import { FAQ } from '@/components/sections/FAQ';
import { ContactForm } from '@/components/sections/ContactForm';

export default function Home() {
  return (
    <>
      <Hero />
      <Portfolio />
      <Services />
      <Process />
      <Studio />
      <FAQ />
      <ContactForm />
    </>
  );
}
