'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
type ProviderErrorProps = {
  params: {
    provider: string;
  };
};

export default function Page({ params }: ProviderErrorProps) {
  const provider = params.provider;
  const router = useRouter();
  useEffect(() => {
    toast.error(
      `${provider} 인증으로 가입한 회원입니다. 해당 경로로 다시 로그인 해주세요.`
    );
    router.push('/login');
  }, [provider, router]);

  return null;
}
