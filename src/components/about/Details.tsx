'use client';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { cn } from '@/utils/style';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Details = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
  });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      variants={slideInFromTop}
      animate={inView ? 'visible' : 'hidden'}
      className="mt-40 flex w-full flex-col"
    >
      <motion.div variants={slideInFromRight(0.8)} className="opacity-[0.9]">
        <h1
          className={cn(
            'gradientMoveText text-6xl font-bold',
            'lg:text-right'
          )}
        >
          Details
        </h1>
      </motion.div>
      <div
        className={cn(
          'mt-20 flex size-full flex-col justify-center gap-8 text-start',
          'lg:flex-row lg:gap-36'
        )}
      >
        <motion.div
          variants={slideInFromLeft(0.8)}
          className={cn(
            'mt-6 flex size-auto max-w-[600px] flex-[1] flex-col gap-2 text-lg font-semibold leading-10 text-white',
            'lg:text-2xl'
          )}
        >
          <div className="flex justify-between">
            <p className="text-slate-200">Name</p>
            <p className="text-slate-400">Kun Woo Kim</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-200">Age</p>
            <p className="text-slate-400">32 years</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-200">Major</p>
            <p className="text-slate-400">Computer Science</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-200">Location</p>
            <p className="text-slate-400">Seoul, Republic of Korea</p>
          </div>
          <div className="mt-8 flex flex-col justify-between gap-4">
            <p className="text-slate-200">Certifications</p>
            <div className="flex flex-col gap-4">
              <p className="text-slate-400">
                Game Programming Certificate ( 2017 )
              </p>
              <p className="text-slate-400">
                Information Processing Engineer ( 2019 )
              </p>
              <p className="text-slate-400">Web Design Certificate ( 2021 )</p>
              <p className="text-slate-400">Data Analysis Associate ( 2023 )</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          variants={slideInFromRight(0.5)}
          className={cn(
            'flex size-auto max-w-[600px] flex-[1] flex-col gap-2 text-lg font-semibold leading-10 text-white',
            'lg:mt-6 lg:text-2xl'
          )}
        >
          <div
            className={cn(
              'flex flex-col justify-between gap-4',
              'lg:text-right'
            )}
          >
            <p className="text-slate-200">Experience</p>
            <div className="flex flex-col gap-4">
              <p className="text-slate-400">
                Represented South Korea in the League of Legends World
                Championship <br /> ( 2016-2017 )
              </p>
              <p className="text-slate-400">Graduated in (2019)</p>
              <p className="text-slate-400">Game Coach at OGT ( 2019 )</p>
              <p className="text-slate-400">
                Freelance Programmer ( 2019-2021 )
              </p>
              <p className="text-slate-400">
                Currently serving as CEO of Lyncare Inc. and CTO of Wevibe Inc.
                ( 2021-present )
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Details;
