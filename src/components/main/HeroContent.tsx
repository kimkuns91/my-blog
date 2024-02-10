'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import Image from 'next/image';

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container z-[5] flex w-full flex-col items-center justify-center py-10 lg:mt-40 lg:flex-row"
    >
      <div className="m-auto flex size-full flex-col justify-center gap-5 text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box border border-[#7042f88b] px-3 py-2 font-bold opacity-[0.9]"
        >
          <SparklesIcon className="mr-[10px] size-5 text-[#b49bff]" />
          <h1 className="Welcome-text text-sm">
            Fullstack Developer WhiteMouse
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="mt-6 flex size-auto max-w-[600px] flex-col gap-4 text-6xl font-bold text-white"
        >
          <p>
            Providing
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">
              {' '}
              The Best
            </span>
          </p>
          <p>Project Exprience</p>
        </motion.div>

        <motion.p
          variants={slideInFromLeft(0.8)}
          className="my-5 max-w-[600px] text-lg text-gray-400"
        >
          I&apos;m a Full Stack Software Engineer with experience in Website,
          Mobile, and Software development. Check out my projects and skills.
        </motion.p>
        <motion.a
          href="/about"
          variants={slideInFromLeft(1)}
          className="button-primary max-w-[200px] cursor-pointer rounded-lg py-2 text-center text-white"
        >
          About Me
        </motion.a>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className="flex size-full items-center justify-end"
      >
        <Image
          src="/images/HeroImg.png"
          alt="work icons"
          width={600}
          height={600}
          className="upAndDown"
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
