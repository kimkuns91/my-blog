import { cn } from '@/utils/style';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <div className="relative flex size-full flex-col" id="about-me">
      <video
        autoPlay
        muted
        loop
        className={cn(
          'absolute left-1/2 top-16 z-[1] size-full -translate-x-1/2 -translate-y-1/2 rotate-180 object-cover opacity-50',
          'lg:top-24 lg:opacity-100'
        )}
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
};

export default Hero;
