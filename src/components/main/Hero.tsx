import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <div className="relative flex size-full flex-col" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="absolute left-0 top-[-320px]  z-[1] size-full rotate-180 object-cover "
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>
      <HeroContent />
    </div>
  );
};

export default Hero;
