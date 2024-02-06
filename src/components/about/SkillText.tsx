'use client';
import {
  slideInFromLeft,
  slideInFromTop
} from '@/utils/motion';
import { motion } from 'framer-motion';

const SkillText = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-8">
      <motion.div
        variants={slideInFromTop}
      >
        <h1 className="bg-gradient-to-l from-[#6AB6EF] to-[#C1E1A1] bg-clip-text font-En text-6xl font-bold text-transparent">
          My Skills
        </h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="mb-[15px] mt-[10px] text-center text-[30px] font-medium text-white"
      >
        Making apps with modern technologies
      </motion.div>
    </div>
  );
};

export default SkillText;
