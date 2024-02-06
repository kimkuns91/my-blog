'use client';

import PostList from '@/components/PostList';
import PostSideBar from '@/components/PostSideBar';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container z-[20] flex min-h-screen w-full flex-col items-center gap-2 py-40"
    >
      <motion.div variants={slideInFromTop} className="opacity-[0.9]">
        <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text font-En text-6xl font-bold text-transparent">
          Posts {category && `# ${category}`} {tag && `# ${tag}`}
        </h1>
      </motion.div>
      <div className="flex w-full">
        <motion.div variants={slideInFromLeft(0.8)} className="flex-1">
          <PostSideBar />
        </motion.div>
        <motion.div variants={slideInFromRight(0.8)} className="flex-[5]">
          <PostList category={category} tag={tag} />
        </motion.div>
      </div>
    </motion.div>
  );
}
