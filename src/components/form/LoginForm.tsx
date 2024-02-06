'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { MdEmail, MdKey } from 'react-icons/md';
import { toast } from 'react-toastify';
import Button from '../Button';
import IconInput from '../IconInput';

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
        console.log();
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
    <div className="flex w-full max-w-[330px] mx-auto flex-col gap-4 min-h-screen justify-center z-20">
      <div className="flex items-center justify-center">
        <Image
          src={'/images/LogoRow.png'}
          alt="Logo"
          width={240}
          height={200}
        />
      </div>
      <h2 className="mt-4 text-xl font-En font-bold text-center leading-8  text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
        Sign up and take away various programming information.
      </h2>
      <div className="mt-8">
        <button
          className="flex w-full flex-row items-center justify-center gap-3 rounded-md bg-[#FEE500] px-5 py-3 font-medium text-slate-900"
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
        <IconInput
          icon={<MdEmail />}
          ref={emailRef}
          type="text"
          name="email"
          placeholder="name@flowbite.com"
        />
        <IconInput
          icon={<MdKey />}
          ref={passwordRef}
          type="password"
          name="password"
          placeholder="········"
        />
        <Button type="submit" className="font-En">
          Login
        </Button>
      </form>
      <Button
        className="bg-[#f2f2f2] text-[#5e5e5e] hover:bg-[#777] mt-4"
        onClick={() => {
          router.push('/regist');
        }}
      >
        Sign Up with your email
      </Button>
    </div>
  );
};
export default LoginForm;
