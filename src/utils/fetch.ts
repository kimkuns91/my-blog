'use server';

import prisma from '@/libs/prisma';
import { Prisma } from '@prisma/client';
import { cache } from 'react';

const isValidObjectId = (id: string): boolean => /^[0-9a-fA-F]{24}$/.test(id);

// 모든 Posts 자료 6개씩 가져오기
export const getPosts = cache(
  async ({
    category,
    tag,
    page = 0,
    role,
  }: {
    category?: string | null;
    tag?: string | null;
    page?: number;
    role?: string;
  }) => {
    try {
      let whereClause: Prisma.PostWhereInput = {};

      console.log('getPosts Role : ', role);
      if (category) whereClause.category = category;
      if (tag) whereClause.tags = { has: tag };
      if (role !== 'ADMIN') {
        whereClause.published = true;
      }
      // page 매개변수를 안전하게 처리
      const posts = await prisma.post.findMany({
        where: whereClause,
        orderBy: {
          createdAt: 'desc',
        },
        skip: page * 6,
        take: 6,
      });

      return posts;
    } catch (error) {
      console.error('Error getPost Function :', error);
      // 여기서 적절한 오류 처리 또는 사용자 정의 오류 반환
      throw new Error('Fetching posts failed');
    }
  }
);

// postId로 Post 자료 가져오기
export const getPost = cache(async (postId: string) => {
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
export const handlePostPublished = async (postId: string) => {
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
};

// 유저 이메일 검증
export const verifyEmail = async (userId: string) => {
  try {
    if (!isValidObjectId(userId)) {
      return null; //
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { status: 'not_found' };
    }

    if (user.emailVerified) {
      return { status: 'already_verified' };
    }

    const result = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return { status: 'verified', result };
  } catch (error) {
    console.error('Error handlePostPublished Function:', error);
    throw error;
  }
};

// 비밀번호 변경
export const verifyChangepassword = async (id: string) => {
  try {
    if (!isValidObjectId(id)) {
      return null; //
    }

    const result = await prisma.changepassword.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    return result.userId;
    
  } catch (error) {
    console.error('Error handlePostPublished Function:', error);
    throw error;
  }
};
