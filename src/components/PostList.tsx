'use client';

import { fetchPosts } from '@/utils/server/serverActions';
import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { FC, useEffect, useState } from 'react';
import PostCard from './PostCard';

type PostListProps = {
  category?: string | null;
  tag?: string | null;
  className?: string;
};

const PostList: FC<PostListProps> = ({ category, tag, className }) => {
  const { data: session } = useSession();
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPosts({
          category,
          tag,
          role: session?.user.role,
        });
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [category, tag, session?.user.role]);

  if (loading) {
    return null;
  }

  return (
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
  );
};

export default PostList;
