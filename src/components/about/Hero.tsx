'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={cn(
        'z-20 flex w-full flex-col items-center justify-center',
        'lg:flex-row'
      )}
    >
      <div className="m-auto flex size-full flex-col justify-center gap-5 text-start">
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-6xl font-bold text-transparent">
            About Me
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mt-6 flex size-auto max-w-[600px] flex-col gap-6 text-2xl font-semibold leading-10 text-white"
        >
          <p>Hi there!</p>
          <p>I’m Kun Woo Kim.</p>
          <p>
            I{"'"}m a Full Stack Developer with a passion for crafting seamless
            and innovative solutions.
          </p>
          <p>
            In the ever-evolving world of technology, I pride myself on staying
            ahead of the curve, continually honing my skills to deliver
            top-notch results.
          </p>
          <p>
            I’m excited to connect with like-minded individuals and
            organizations, so feel free to reach out if you’d like to chat about
            technology, collaboration, or just to share a great story!
          </p>
        </motion.div>
      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className={cn(
          'mt-20 flex size-full max-w-[550px] items-center justify-center',
          'lg:mt-0 lg:items-end lg:justify-end'
        )}
      >
        <Image
          src="/images/MyPicture01.jpg"
          alt="MyPicture"
          width={550}
          height={550}
          className={cn('rounded-[25px]', 'lg:scale-100')}
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
