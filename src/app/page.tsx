import Hero from '@/components/main/Hero';
import MyProjects from '@/components/main/MyProjects';
import Skills from '@/components/main/Skills';

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      <Hero />
      <Skills />
      <div className='relative z-10'>
        <MyProjects />
      </div>
    </div>
  );
}
