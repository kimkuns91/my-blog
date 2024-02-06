import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchTags } from './server/serverActions'; // 별도 파일에서 가져온 함수 사용

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await fetchCategories();
      // console.log('categories : ', data);
      if (!data) return [];
      return Array.from(new Set(data.map((d) => d.category))).filter(Boolean);
    },
  });

export const useTags = () =>
  useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      const data = await fetchTags();
      // console.log('tags : ', data);
      if (!data) return [];
      return Array.from(new Set(data.map((d) => d.tag))).filter(Boolean);
    },
  });
