import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const data = await prisma.post.findMany();
    // console.log('Server Side Data : ', data)
    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'An error occurred.' },
      { status: 500 }
    );
  }
}
