'use client';

import { fetchPosts } from '@/utils/server/serverActions';
import { cn } from '@/utils/style';
import { Post } from '@prisma/client';
import { FC, useEffect, useState } from 'react';
import PostCard from './PostCard';

type PostListProps = {
  category?: string | null;
  tag?: string | null;
  className?: string;
};

const PostList: FC<PostListProps> = ({ category, tag, className }) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPosts({ category, tag });
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [category, tag]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 표시
  }

  return (
    <div className={cn('flex flex-col items-center gap-8', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="grid grid-cols-3 gap-x-4 gap-y-6 pb-24 pt-20 lg:gap-x-7 lg:gap-y-12">
        {data.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            previewImageUrl={post.previewImageUrl}
            category={post.category}
            tags={post.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default PostList;
