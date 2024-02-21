import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    console.log(token)
    // if (!session) {
    //   return NextResponse.json(
    //     {
    //       message: '세션 정보가 만료되었습니다. 다시 로그인 해주세요.',
    //     },
    //     {
    //       status: 409,
    //     }
    //   );
    // }
    // const userId = session.user.id;
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });

    // if (!user) {
    //   return NextResponse.json(
    //     {
    //       message: '해당 이메일로 가입된 유저가 없습니다.',
    //     },
    //     {
    //       status: 409,
    //     }
    //   );
    // }

    return NextResponse.json({ user: '' }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
