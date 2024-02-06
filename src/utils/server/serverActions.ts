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
}: {
  category?: string | null;
  tag?: string | null;
}) {
  try {
    if (category) {
      const data = await prisma.post.findMany({
        where: {
          category,
        },
      });
      return data;
    }
    if (tag) {
      const data = await prisma.post.findMany({
        where: {
          tags: {
            has: tag,
          },
        },
      });
      return data;
    }
    const data = await prisma.post.findMany({
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
