import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;

    const room = await prisma.aiChatRoom.findUnique({
      where: { id: roomId },
    });

    return NextResponse.json(room, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;
    console.log('roomId', roomId);

    await prisma.$transaction(async (prisma) => {
      await prisma.aiChatMessage.deleteMany({
        where: { roomId: roomId },
      });
      await prisma.aiChatRoom.delete({
        where: { id: roomId },
      });
    });

    return NextResponse.json(
      { message: '채팅방과 메세지들이 삭제 되었습니다.' },
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
