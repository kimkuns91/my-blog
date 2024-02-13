import Hero from '@/components/main/Hero';
import Skills from '@/components/main/Skills';
import StarsCanvas from '@/components/StarBackground';

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Skills />
      <StarsCanvas />
    </div>
  );
}
