import { Post } from '@prisma/client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getCategories, getPosts, getTags } from './fetch';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await getCategories();
      if (!data) return [];
      return Array.from(new Set(data.map((d) => d.category))).filter(Boolean);
    },
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const data = await getTags();
      if (!data) return [];
      return Array.from(new Set(data.map((d) => d.tag))).filter(Boolean);
    },
  });

export const usePosts = ({
  category,
  tag,
  initalPosts,
  page,
}: {
  category?: string;
  tag?: string;
  initalPosts?: Post[];
  page?: number;
}) =>
  useInfiniteQuery({
    queryKey: ['posts', category, tag],
    queryFn: async ({ pageParam }) => {
      const posts = await getPosts({ category, tag, page });
      if (!posts)
        return {
          posts: [],
          nextPage: null,
        };
      return {
        posts,
        nextPage: posts.length === 5 ? pageParam + 5 : null,
      };
    },
    initialData: !!initalPosts
      ? {
          pages: [
            {
              posts: initalPosts,
              nextPage: initalPosts.length === 5 ? 5 : null,
            },
          ],
          pageParams: [0],
        }
      : undefined,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
