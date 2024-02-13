import Details from '@/components/about/Details';
import Hero from '@/components/about/Hero';
import Skills from '@/components/about/Skills';

export default function Page() {
  return (
    <div className="container flex w-full flex-col gap-20 py-40">
      <Hero />
      <Details />
      <Skills />
    </div>
  );
}
