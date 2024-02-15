'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  useEffect(() => {
    toast.error(message + '로 가입한 회원입니다. 다시 로그인 해주세요.');
    router.push('/login');
  }, [message, router]);

  return null;
}
