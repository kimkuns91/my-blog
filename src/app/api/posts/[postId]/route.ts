import prisma from '@/libs/prisma';
import { supabase } from '@/libs/supabase';
import { Post } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

async function findOrCreateTag(tagName: string) {
  const tag = await prisma.tags.upsert({
    where: {
      tag: tagName, // 'name' 필드를 기준으로 데이터를 찾습니다.
    },
    update: {},
    create: {
      tag: tagName, // 존재하지 않는 경우 새로 생성할 데이터
    },
  });

  return tag;
}

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    await prisma.post.delete({
      where: { id: postId },
    });

    return NextResponse.json(
      {
        message: '해당 글이 삭제되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    const formData = await request.formData();
    const userId = formData.get('userId') as string;
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const content = formData.get('content') as string;
    const previewImage = formData.get('previewImage') as File;

    let publicUrl = null;

    if (previewImage) {
      const contentType = previewImage?.type || 'application/octet-stream';
      if (!contentType.startsWith('image/')) {
        return NextResponse.json(
          { message: '이미지 파일만 업로드 가능합니다.' },
          { status: 400 }
        );
      }
      const uniqueFileName = uuidv4();
      const filePath = `uploads/${userId}/${uniqueFileName}`;

      const { error, data } = await supabase.storage
        .from('images') // 스토리지 버킷 이름
        .upload(filePath, previewImage, {
          contentType, // 동적으로 설정한 콘텐츠 타입
          upsert: false, // 기존 파일을 덮어쓸지 여부
        });

      if (error) {
        throw error;
      }

      publicUrl = `${process.env.SUPABASE_IMAGE_URL}${data?.path}`;
    }

    let parsedTags;
    try {
      parsedTags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    } catch (e) {
      return NextResponse.json(
        { message: 'Tags are not in a proper format.' },
        { status: 400 }
      );
    }
    const result = await prisma.post.update({
      where: {
        id: postId, // 포스트를 식별하기 위한 고유 ID
      },
      data: {
        title,
        content,
        category,
        tags: parsedTags,
        userId,
        previewImageUrl: publicUrl, // Use publicUrl here
      } as Post,
    });

    await prisma.categories.upsert({
      where: {
        category, // 'name' 필드를 기준으로 데이터를 찾습니다.
      },
      update: {}, // 이미 존재하는 경우 업데이트할 필드 (여기서는 업데이트할 내용이 없으므로 빈 객체)
      create: {
        category, // 존재하지 않는 경우 새로 생성할 데이터
      },
    });

    await parsedTags.map((tagName: string) => findOrCreateTag(tagName));

    return NextResponse.json(
      {
        message: '해당 글이 수정되었습니다.',
        postId: result.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
