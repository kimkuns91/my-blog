import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

function isValidObjectId(id: string) {
  return /^[0-9a-fA-F]{24}$/.test(id);
}

export async function PUT(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
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

    if (user.emailVerified) {
      return NextResponse.json({ message: 'Already_verified' });
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: 'Verified',
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.error();
  }
}
