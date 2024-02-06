'use client';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
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
      className="container mt-40 flex w-full flex-col px-20"
    >
      <motion.div variants={slideInFromRight(0.8)} className="opacity-[0.9]">
        <h1 className="bg-gradient-to-b from-[#48B6F5] to-[#085A8A] bg-clip-text text-right font-En text-6xl font-bold text-transparent">
          Details
        </h1>
      </motion.div>
      <div className="m-auto mt-20 flex size-full flex-row justify-center gap-36 text-start">
        <motion.div
          variants={slideInFromLeft(0.8)}
          className="mt-6 flex size-auto max-w-[600px] flex-[1] flex-col gap-2 text-2xl font-semibold leading-10 text-white"
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
          className="mt-6 flex size-auto max-w-[600px] flex-[1] flex-col gap-2 text-2xl font-semibold leading-10 text-white"
        >
          <div className="flex flex-col justify-between gap-4">
            <p className="text-right text-slate-200">Experience</p>
            <div className="flex flex-col gap-4">
              <p className="text-right text-slate-400">
                Represented South Korea in the League of Legends World
                Championship <br /> ( 2016-2017 )
              </p>
              <p className="text-right text-slate-400">Graduated in (2019)</p>
              <p className="text-right text-slate-400">
                Game Coach at OGT ( 2019 )
              </p>
              <p className="text-right text-slate-400">
                Freelance Programmer ( 2019-2021 )
              </p>
              <p className="text-right text-slate-400">
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
