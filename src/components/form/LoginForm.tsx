'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Button from '../Button';
import Input from '../Input';

const LoginForm = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const res = await signIn('credentials', {
        email: emailRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
        redirect: false,
      });
      if (res && res.status === 401) {
        console.log()
        toast.error('🐭 : ' + res.error + ' 찍찍! ');
      } else {
        toast.success('🐭 : 로그인 완료 찍찍! ');
        router.push('/');
      }
    } catch (error: any) {
      toast.error('🐭 : ' + error.message + ' 찍찍! ');
    }
  };

  return (
    <div className="flex w-full max-w-[330px] mx-auto flex-col gap-4 py-20">
      <Image src={'/images/Logo.png'} alt="Logo" width={130} height={0} />
      <h2 className="mt-4 text-xl font-semibold leading-8">
        White Mouse Dev 에서,
        <br />
        여러 프로그래밍 정보를 얻어가세요!
      </h2>
      <div className="mt-8">
        <button
          className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-[#FEE500] px-5 py-3 font-medium"
          onClick={() => signIn('kakao', { redirect: true, callbackUrl: '/' })}
        >
          <Image
            src={'/images/kakaoIcon.svg'}
            width={20}
            height={20}
            alt="kakaoIcon"
          />
          카카오로 1초 만에 시작하기
        </button>
      </div>
      <div>
        <p className="custom-border my-4 text-center text-[#919191]">
          또는 이메일로 로그인
        </p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6" action="">
        <label htmlFor="email">Email</label>
        <Input ref={emailRef} type="text" placeholder="아이디" />
        <label htmlFor="email">Password</label>
        <Input ref={passwordRef} type="password" placeholder="비밀번호" />
        <Button type="submit">로그인</Button>
      </form>
      <Button
        className="bg-[#f2f2f2] text-[#5e5e5e] hover:bg-[#777]"
        onClick={() => {
          router.push('/regist');
        }}
      >
        이메일로 회원가입
      </Button>
    </div>
  );
};
export default LoginForm;
