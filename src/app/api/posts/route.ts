import prisma from '@/libs/prisma';
import { Post } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, title, category, tags, content, previewImage } = body;
    const tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
    // console.log('userId : ', userId);
    // console.log('title : ', typeof title);
    // console.log('category : ', typeof category);
    // console.log('tags : ', tagsArray);
    // console.log('tags : ', typeof tagsArray);
    // console.log('content : ', typeof content);
    // console.log('previewImage : ', typeof previewImage);


    const result = await prisma.post.create({
      data: {
        title,
        content,
        category, // 예시 카테고리
        tags : tagsArray, // 태그 배열
        userId,
      } as Post,
    });
    console.log('result : ',result);
    return NextResponse.json(
      {
        message: '글 작성이 완료되었습니다.',
        postId: result.id
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.error();
  }
}
