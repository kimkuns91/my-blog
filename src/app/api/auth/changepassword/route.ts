import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, password } = body;

    if (!isValidObjectId(userId)) {
      return NextResponse.json({ message: 'Invalid path' });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Not_found' });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password,
      },
    });

    return NextResponse.json(
      {
        message: '비밀번호 변경이 완료되었습니다.',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error();
  }
}
