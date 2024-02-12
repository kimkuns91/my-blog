import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const { roomId } = params;

    console.log('roomId :', roomId);
    const messages = await prisma.aiChatMessage.findMany({
      where: { roomId: roomId },
    });

    return NextResponse.json(messages, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  try {
    const body = await request.json();
    const { message } = body;
    const { roomId } = params;

    console.log('POST message :', message);
    console.log('POST roomId :', roomId);
    const messages = await prisma.aiChatMessage.create({
      data: {
        content: message.content,
        role: message.role,
        roomId: roomId,
      },
    });
    console.log(messages);
    return NextResponse.json(messages, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
