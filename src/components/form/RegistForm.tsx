'use client';

import { slideInFromTop } from '@/utils/motion';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import Button from '../Button';
import Input from '../Input';

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
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        className="max-w-[330px] mx-auto  gap-8 flex flex-col font-En w-full z-[20]"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="font-En text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 py-4">
            Sign Up
          </h1>
        </motion.div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label htmlFor="email">EMAIL</label>
          <Input ref={emailRef} type="text" name="email" />
          <label htmlFor="name">Name</label>
          <Input ref={nameRef} type="text" name="name" />
          <label htmlFor="password">Password</label>
          <Input ref={passwordRef} type="password" name="password" />
          <Button type="submit">회원가입</Button>
        </form>
      </motion.div>
    </div>
  );
};
export default RegistForm;
