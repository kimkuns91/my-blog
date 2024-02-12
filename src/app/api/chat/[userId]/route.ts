import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;

    const rooms = await prisma.aiChatRoom.findMany({
      where: { userId: userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(rooms, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
