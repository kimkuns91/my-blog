'use client';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';

const SkillText = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="relative inline-flex items-center justify-center gap-2 rounded-full border border-[#7042f88b] px-8 py-3 font-bold opacity-[0.9] shadow-lg"
      >
        <SparklesIcon className="size-5 text-[#b49bff]" />
        <p className='text-[#e2dcf5]'>Fullstack Skills</p>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="mb-4 mt-6 text-center text-3xl font-medium text-white"
      >
        Making apps with modern technologies
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="mb-10 text-center text-xl text-gray-200"
      >
        Never miss a task, deadline or idea
      </motion.div>
    </div>
  );
};

export default SkillText;
