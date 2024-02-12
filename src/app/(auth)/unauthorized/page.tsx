'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  useEffect(() => {
    toast.error(
      '🐭 : 해당 페이지 접속 권한이 없습니다. 쥐구멍으로 돌아가세요! 찍찍! '
    );
  }, []);
  return (
    <div className="container z-20 flex h-screen flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <Image
          src={'/images/LogoRow.png'}
          alt="Logo"
          width={240}
          height={200}
        />
      </div>
      <h2 className="mt-8 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text py-8 text-center  text-4xl font-bold leading-8 text-transparent lg:text-[80px]">
        Unauthorized
      </h2>
      <p className="mb-8 bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-lg font-bold text-transparent">
        해당 페이지 접속 권한이 없습니다.
      </p>
      <Link
        href={'/'}
        className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
