import { contactEmail } from '@/libs/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {email, name, phone, message} = body;
    const response = await contactEmail({email, name, phone, message})
    console.log(response)
    return NextResponse.json(
      {
        message: '글 작성이 완료되었습니다.',
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
