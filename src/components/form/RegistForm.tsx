"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import Button from "../Button";
import Input from "../Input";

const RegistForm = () => {
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const response = await axios.post('/api/auth/signup', {
        email: emailRef.current?.value ?? '',
        name: nameRef.current?.value ?? '',
        password: passwordRef.current?.value ?? '',
      });

      if (response.status === 201) {
        alert('회원가입 성공');
        router.push('/login');
      }
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex w-full max-w-[330px] mx-auto flex-col gap-4 py-20">
      <h2 className="text-lg font-bold">회원가입</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <label htmlFor="email">이메일</label>
        <Input ref={emailRef} type="text" name="email" />
        <label htmlFor="name">이름</label>
        <Input ref={nameRef} type="text" name="name" />
        <label htmlFor="password">비밀번호</label>
        <Input ref={passwordRef} type="password" name="password" />
        <Button type="submit">회원가입</Button>
      </form>
    </div>
  );
};
export default RegistForm;
