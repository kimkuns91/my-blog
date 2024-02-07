// serverActions.ts
'use server';

import prisma from '@/libs/prisma';

export async function fetchCategories() {
  try {
    const data = await prisma.categories.findMany();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export async function fetchTags() {
  try {
    const data = await prisma.tags.findMany();
    return data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
}

export async function fetchPosts({
  category,
  tag,
  role, // 사용자의 역할을 나타내는 추가 파라미터
}: {
  category?: string | null;
  tag?: string | null;
  role?: string; // role 파라미터 추가
}) {
  try {
    const whereCondition = {
      AND: [
        // category 조건이 있는 경우 해당 조건 추가
        category ? { category } : {},
        // tag 조건이 있는 경우 해당 조건 추가
        tag ? { tags: { has: tag } } : {},
        // 사용자가 ADMIN이 아니면 published: true인 포스트만 반환
        role !== 'ADMIN' ? { published: true } : {},
      ],
    };

    const data = await prisma.post.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function fetchPostByID({ postId }: { postId: string }) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function handlePostPublished({ postId }: { postId: string }) {
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
    console.error('Error fetching posts:', error);
    throw error;
  }
}
