import Details from '@/components/about/Details';
import Hero from '@/components/about/Hero';
import Skills from '@/components/about/Skills';

export default function Page() {
  return (
    <div className='container flex py-20 font-En'>
      <div className="w-full flex flex-col gap-20">
        <Hero />
        <Details />
        <Skills />
      </div>
    </div>
  );
}
