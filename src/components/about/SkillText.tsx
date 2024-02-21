'use client';
import { slideInFromLeft, slideInFromTop } from '@/utils/motion';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';

const SkillText = () => {
  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-8">
      <motion.div variants={slideInFromTop}>
        <h1 className="gradientMoveSubtitle text-6xl font-bold">My Skills</h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className={cn(
          'mb-[15px] mt-[10px] text-center text-[30px] font-medium leading-10 text-white'
        )}
      >
        Making apps with modern technologies
      </motion.div>
    </div>
  );
};

export default SkillText;
