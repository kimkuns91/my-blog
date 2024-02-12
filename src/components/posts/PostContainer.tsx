'use client';

import {
    slideInFromLeft,
    slideInFromRight,
    slideInFromTop,
} from '@/utils/motion';
import { Post } from '@prisma/client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';
import PostList from './PostList';
import PostSideBar from './PostSideBar';

interface PostContainerProps {
  category?: string;
  tag?: string;
  posts: Post[];
  role?: string;
}

const PostContainer: React.FC<PostContainerProps> = ({
  category,
  tag,
  posts,
  role = 'USER',
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container relative z-[20] flex min-h-screen w-full flex-col items-center gap-2 py-40"
    >
      <motion.div variants={slideInFromTop} className="opacity-[0.9]">
        <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text  text-6xl font-bold text-transparent">
          Posts {category && `# ${category}`} {tag && `# ${tag}`}
        </h1>
      </motion.div>
      <div className="flex w-full">
        <motion.div variants={slideInFromLeft(0.8)} className="flex-1">
          <PostSideBar />
        </motion.div>
        <motion.div variants={slideInFromRight(0.8)} className="flex-[5]">
          <PostList posts={posts} category={category} tag={tag} role={role} />
        </motion.div>
      </div>
      {role === 'ADMIN' && (
        <Link
          href={'/posts/write'}
          className="fixed bottom-16 right-16 rounded-full bg-slate-500 p-8"
        >
          <FaPlus />
        </Link>
      )}
    </motion.div>
  );
};
export default PostContainer;
