'use client';

import PostList from '@/components/PostList';
import PostSideBar from '@/components/PostSideBar';
import { useSearchParams } from 'next/navigation';

export default function Page() {
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  return (
    <div className="container w-full flex py-40">
      <div className='flex-1'>
        <PostSideBar />
      </div>
      <div className='flex-[5]'>
        <PostList />
      </div>
    </div>
  );
}
