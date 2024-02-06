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
        className="flex gap-2 items-center font-En text-2xl font-bold text-slate-200 mb-3"
        href={'/posts'}
      >
        <MdHome />
        <p className="transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500">
          Root
        </p>
      </Link>
      {existingCategories?.map((category, index) => (
        <Link
          className="flex gap-2 items-center font-En font-semibold text-xl text-slate-300"
          key={index}
          href={`/posts?category=${category}`}
        >
          <PiTagChevronFill />
          <p className="transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500">
            {category}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PostSideBar;
