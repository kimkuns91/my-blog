'use client';
import {
  slideInFromLeft,
  slideInFromTop
} from '@/utils/motion';
import { motion } from 'framer-motion';

const SkillText = () => {
  return (
    <div className="w-full h-auto flex flex-col gap-8 items-center justify-center">
      <motion.div
        variants={slideInFromTop}
      >
        <h1 className="font-En text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-l from-[#6AB6EF] to-[#C1E1A1]">
          My Skills
        </h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-white font-medium mt-[10px] text-center mb-[15px]"
      >
        Making apps with modern technologies
      </motion.div>
    </div>
  );
};

export default SkillText;
