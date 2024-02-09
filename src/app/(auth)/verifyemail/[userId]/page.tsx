'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

type VerifyEmailProps = {
  params: {
    userId: string;
  };
};

export default function Page({ params }: VerifyEmailProps) {
  const router = useRouter();

  const userId = params.userId

  useEffect(() => {
    (async()=>{
      const response = await axios.put(`/api/auth/verifyemail/${userId}`)
      const { message } = response.data;

      switch (message) {
        case 'Invalid path':
          toast.error('잘못된 경로입니다.');
          router.push('/');
          break;
        case 'Verified':
          toast.success('이메일 인증이 완료되었습니다.');
          router.push('/login');
          break;
        case 'Already_verified':
          toast.error('이미 인증된 회원입니다.');
          router.push('/');
          break;
        case 'Not_found':
          toast.error('해당 유저 ID가 없습니다.');
          router.push('/');
          break;
        default:
          router.push('/');
      }
    })()
  }, [userId, router]);

  return null;
}
