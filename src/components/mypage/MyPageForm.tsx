'use client';

import { slideInFromLeft, slideInFromRight } from '@/utils/motion';
import { cn } from '@/utils/style';
import { User } from '@prisma/client';
import axios from 'axios';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MyPageFormProps {
  userId: string;
}
const MyPageForm: React.FC<MyPageFormProps> = ({ userId }) => {
  const [userinfo, setUserinfo] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/auth/userinfo/${userId}`);
      setUserinfo(response.data);
    })();
  }, [userId]);

  if (!userinfo) return null;

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        className={cn(
          'container relative z-[20] w-full',
          'flex items-center justify-center'
        )}
      >
        <motion.div
          variants={slideInFromLeft(0.8)}
          className={cn(
            'hidden flex-[1] flex-col items-center justify-center gap-10',
            'lg:flex'
          )}
        >
          <div
            className={cn(
              'relative size-[300px] overflow-hidden',
              'rounded-full bg-slate-400'
            )}
          >
            <Image
              src={userinfo.profileImg}
              alt="MyPicture"
              fill
              sizes="360px"
              className="object-cover"
            />
          </div>
        </motion.div>
        <motion.div
          variants={slideInFromRight(0.8)}
          className="flex flex-[1] flex-col gap-4 text-lg font-semibold"
        >
          <div className="flex gap-4">
            <p className="text-slate-200">이메일 : </p>
            <p className="text-slate-400">{userinfo.email}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-slate-200">이름 : </p>
            <p className="text-slate-400">{userinfo.name}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-slate-200">유저 권한 : </p>
            <p className="text-slate-400">{userinfo.role}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-slate-200">가입 경로 : </p>
            <p className="text-slate-400">{userinfo.provider}</p>
          </div>
          <div className="flex gap-4">
            <p className="text-slate-200">회원 가입 일자 : </p>
            <p className="text-slate-400">
              {format(new Date(userinfo.createdAt), 'yyyy년 M월 d일')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default MyPageForm;
