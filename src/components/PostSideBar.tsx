'use client';

import { useCategories } from '@/utils/hooks';
import Link from 'next/link';

const PostSideBar = () => {
  const { data: existingCategories } = useCategories();
  return (
    <div className="flex flex-col items-start gap-4 pt-20">
      <Link className="text-2xl transition-all hover:text-orange-400" href={'/posts'}>
        Root
      </Link>
      {existingCategories?.map((category, index) => (
        <Link
          className="text-xl transition-all hover:text-orange-400"
          key={index}
          href={`/posts/search?category=${category}`}
        >
          # {category}
        </Link>
      ))}
    </div>
  );
};

export default PostSideBar;
