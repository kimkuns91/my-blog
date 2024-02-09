'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { Post } from '@prisma/client';
import { motion } from 'framer-motion';
import PostList from './PostList';
import PostSideBar from './PostSideBar';

interface PostContainerProps {
  category?: string;
  tag?: string;
  posts: Post[];
}

const PostContainer: React.FC<PostContainerProps> = ({
  category,
  tag,
  posts,
}) => {
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
          <PostList posts={posts} />
        </motion.div>
      </div>
    </motion.div>
  );
};
export default PostContainer;
