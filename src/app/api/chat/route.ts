import prisma from '@/libs/prisma';
import { format } from 'date-fns';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, mode } = body;

  const name = `${format(new Date(), 'yyyy년 M월 d일 HH:mm')}에 생성된 방`;
  const newRooms = await prisma.aiChatRoom.create({
    data: {
      name,
      userId,
      mode
    },
  });

  return NextResponse.json(newRooms, { status: 201 });
}
