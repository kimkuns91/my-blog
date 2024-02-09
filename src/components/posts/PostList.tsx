'use client';

import { cn } from '@/utils/style';
import { Post } from '@prisma/client';
import PostCard from './PostCard';

type PostListProps = {
  className?: string;
  posts?: Post[];
};

const PostList: React.FC<PostListProps> = ({
  className,
  posts,
}) => {
  return (
    <div
      className={cn('z-10 flex flex-col items-center gap-8 pt-20', className)}
    >
      <div className="container grid grid-cols-2 gap-x-4 gap-y-6 pb-24 lg:gap-x-7 lg:gap-y-12">
        {posts?.map((post) => (
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
