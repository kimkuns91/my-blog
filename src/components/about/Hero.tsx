'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';

const Hero = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="font-En text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            About Me
          </h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-2xl font-semibold text-white max-w-[600px] w-auto h-auto leading-10"
        >
          <p>Hi there!</p>
          <p>
            I’m Kun Woo Kim.
          </p>
          <p>
            I'm a Full Stack Developer with a passion for crafting seamless and
            innovative solutions.
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
        className="w-full h-full flex justify-end items-center"
      >
        <Image
          src="/images/MyPicture01.jpg"
          alt="MyPicture"
          width={500}
          height={500}
          className="rounded-[25px]"
        />
      </motion.div>
    </motion.div>
  );
};

export default Hero;
