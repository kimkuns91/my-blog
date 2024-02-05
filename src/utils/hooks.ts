import prisma from '@/libs/prisma';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await prisma.categories.findMany();
      console.log('categories : ', data);
      return Array.from(new Set(data?.map((d) => d.category)));
    },
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const data = await prisma.tags.findMany();
      console.log('tags : ', data);
      return Array.from(new Set(data?.flatMap((d) => JSON.parse(d.tag))));
    },
  });
