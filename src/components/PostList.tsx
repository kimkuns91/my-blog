import prisma from '@/libs/prisma';
import { cn } from '@/utils/style';
import { FC } from 'react';
import PostCard from './PostCard';

type PostListProps = {
  category?: string;
  tag?: string;
  className?: string;
};
const fetchData = async ({ category, tag }: PostListProps) => {
  if (category) {
    const data = await prisma.post.findMany({
      where: {
        category,
      },
    });
    return data;
  }
  const data = await prisma.post.findMany();
  return data;
};

const PostList: FC<PostListProps> = async ({ category, tag, className }) => {
  const data = await fetchData({ category, tag });
  console.log(data)
  return (
    <div className={cn('flex flex-col items-center gap-8 pt-20', className)}>
      <h1 className={cn('text-2xl font-medium', !category && !tag && 'hidden')}>
        {category ? category : `#${tag}`}
      </h1>
      <div className="container grid grid-cols-4 gap-x-4 gap-y-6 pb-24 pt-20 lg:gap-x-7 lg:gap-y-12">
        {data.map((post) => (
          <PostCard
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
