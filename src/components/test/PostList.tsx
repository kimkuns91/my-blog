'use client';

import { Post } from '@prisma/client';
import { FC, useState } from 'react';
import PostCard from '../PostCard';

type PostListProps = {
  data: Post[];
  category?: string | null;
  tag?: string | null;
  className?: string;
};

const PostList: FC<PostListProps> = ({ data, category, tag, className }) => {
  const [loading, setLoading] = useState(false);

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
