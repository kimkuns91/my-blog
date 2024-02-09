import { changePassEmail } from '@/libs/nodemailer';
import prisma from '@/libs/prisma';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    console.log('email :', email)
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: '해당 이메일로 가입된 유저가 없습니다.',
        },
        {
          status: 409,
        }
      );
    }

    if(user.provider !== 'credentials') {
      return NextResponse.json(
        {
          message: `${user.provider}으로 가입된 이메일입니다.`,
        },
        {
          status: 409,
        }
      );
    }

    await changePassEmail({
      email: user.email,
      id: user.id,
    });

    return NextResponse.json(
      {
        message: '해당 이메일로 인증 메일이 발송되었습니다.',
      },
      { status: 201 }
    );
    
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.error();
  }
}
