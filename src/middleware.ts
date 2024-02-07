import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  // ADMIN 접속 가능한 페이지
  const protectedPaths = ['/admin', '/dashboard', '/posts/write'];
  // 이미 로그인 한 회원들은 접속 할 수 없는 페이지
  const publicOnlyPaths = ['/login', '/register'];

  const pathname = req.nextUrl.pathname;
  // 현재 경로가 보호된 경로인지 확인
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );
  // 현재 경로가 로그인/등록 경로인지 확인
  const isPublicOnlyPath = publicOnlyPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    if (!token || token.role !== 'ADMIN') {
      const url = req.nextUrl.clone();
      url.pathname = '/unauthorized';
      return NextResponse.redirect(url);
    }
  }

  // 로그인/등록 경로에 대한 접근 제한 (이미 로그인한 사용자는 접근 불가)
  if (isPublicOnlyPath && token) {
    const url = req.nextUrl.clone();
    url.pathname = '/'; // 혹은 다른 리디렉션 대상 경로
    return NextResponse.redirect(url);
  }
  // 모든 체크를 통과한 경우 요청을 계속 진행합니다.
  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/register', '/dashboard', '/posts/write'],
};
