'use server';

import prisma from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { cache } from 'react';

const isValidObjectId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

// 모든 Posts 자료 가져오기
export const getPosts = cache(
  async ({
    category,
    tag,
    page = 0,
  }: {
    category?: string;
    tag?: string;
    page?: number;
  }) => {
    try {
      let whereClause: Prisma.PostWhereInput = {};

      if (category) whereClause.category = category;
      if (tag) whereClause.tags = { has: tag };

      const posts = await prisma.post.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip: page * 5,
        take: 5,
      });

      return posts;
    } catch (error) {
      console.error('Error getPost Function :', error);
      throw error;
    }
  }
);

// postId로 Post 자료 가져오기
export const getPost = cache(async (postId: string) => {
  try {
    if (!isValidObjectId(postId)) {
      return null; //
    }

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) return null;

    return post;
  } catch (error) {
    console.error('Error getPost Function :', error);
    throw error;
  }
});

// 모든 Tags 가져오기
export const getTags = cache(async () => {
  try {
    const tags = await prisma.tags.findMany();

    if (!tags) return [];

    return tags;
  } catch (error) {
    console.error('Error getTags Function :', error);
    throw error;
  }
});

// 모든 Categories 가져오기
export const getCategories = cache(async () => {
  try {
    const categories = await prisma.categories.findMany();
    if (!categories) return [];

    return categories;
  } catch (error) {
    console.error('Error getCategories Function :', error);
    throw error;
  }
});

// Post의 노출 여부 변경하기
export const handlePostPublished = cache(async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) {
      throw new Error(`Post with ID ${postId} not found`);
    }
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        published: !post.published, // 현재 값의 반대로 설정합니다.
      },
    });
    return updatedPost;
  } catch (error) {
    console.error('Error handlePostPublished Function:', error);
    throw error;
  }
});
