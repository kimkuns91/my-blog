'use client';

import { getPosts } from '@/utils/fetch';
import { cn } from '@/utils/style';
import { Post } from '@prisma/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import PostCard from './PostCard';

type PostListProps = {
  category?: string;
  tag?: string;
  className?: string;
  posts?: Post[];
};

const PostList: React.FC<PostListProps> = ({
  category,
  tag,
  className,
  posts: initalPosts,
}) => {
  const { ref, inView } = useInView();

  const {
    data: postPages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', category, tag],
    queryFn: async ({ pageParam }) => {
      const posts = await getPosts({
        category,
        tag,
        page: pageParam,
      });
      if (!posts)
        return {
          posts: [],
          nextPage: null,
        };
      return {
        posts,
        nextPage: posts.length === 6 ? pageParam + 1 : null,
      };
    },
    initialData: !!initalPosts
      ? {
          pages: [
            {
              posts: initalPosts,
              nextPage: initalPosts.length === 6 ? 1 : null,
            },
          ],
          pageParams: [0],
        }
      : undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView, hasNextPage, fetchNextPage]);

  console.log('postPages : ', postPages?.pages);
  return (
    <div
      className={cn('z-10 flex flex-col items-center gap-8 pt-20', className)}
    >
      <div className="container grid grid-cols-2 gap-x-4 gap-y-6 pb-24 lg:gap-x-7 lg:gap-y-12">
        {postPages?.pages
          .flatMap((page) => page.posts)
          .map((post) => (
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
      <div ref={ref} />
    </div>
  );
};

export default PostList;
