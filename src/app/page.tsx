import Hero from '@/components/main/Hero';
import Skills from '@/components/main/Skills';
import StarsCanvas from '@/components/StarBackground';

export default function Home() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Skills />
        <StarsCanvas />
      </div>
    </div>
  );
}
