'use client';

import { useCategories } from '@/utils/hooks';
import Link from 'next/link';
import { MdHome } from 'react-icons/md';
import { PiTagChevronFill } from 'react-icons/pi';
const PostSideBar = () => {
  const { data: existingCategories } = useCategories();
  return (
    <div className="flex flex-col items-start gap-4 pt-20">
      <Link
        className="mb-3 flex items-center gap-2 font-En text-2xl font-bold text-slate-200"
        href={'/posts'}
      >
        <MdHome />
        <p className="transition-all hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent">
          Root
        </p>
      </Link>
      {existingCategories?.map((category, index) => (
        <Link
          className="flex items-center gap-2 font-En text-xl font-semibold text-slate-300"
          key={index}
          href={`/posts?category=${category}`}
        >
          <PiTagChevronFill />
          <p className="transition-all hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent">
            {category}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PostSideBar;
