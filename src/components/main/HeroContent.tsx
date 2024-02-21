'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GiSeatedMouse } from 'react-icons/gi';
import { Button } from '../ui/moving-border';

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className={cn(
        'container z-[5] flex w-full flex-col items-center justify-center pt-32',
        'lg:mt-40 lg:flex-row lg:py-10'
      )}
    >
      <div
        className={cn(
          'm-auto flex size-full flex-col justify-center gap-5 text-start'
        )}
      >
        <motion.div variants={slideInFromTop}>
          <div className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[#7042f88b] px-8 py-3 font-bold opacity-[0.9] shadow-lg">
            <GiSeatedMouse className="text-lg text-[#b49bff]" />
            <p className='text-[#e2dcf5]'>Fullstack Developer WhiteMouse</p>
          </div>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className={cn(
            'mt-6 flex size-auto max-w-[600px] flex-col gap-4 text-4xl font-bold text-white',
            'lg:text-6xl'
          )}
        >
          <p>
            Providing
            <span className="gradientMoveTitle"> The Best</span>
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
        <motion.div variants={slideInFromLeft(1)}>
          <Button borderRadius="1.75rem">Project Request</Button>
        </motion.div>
      </div>

      <motion.div
        variants={slideInFromRight(0.8)}
        className={cn(
          'mt-12 flex size-full items-center justify-end',
          'lg:mt-0'
        )}
      >
        <Image
          src="/images/mainIconsdark.svg"
          alt="work icons"
          width={600}
          height={600}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
