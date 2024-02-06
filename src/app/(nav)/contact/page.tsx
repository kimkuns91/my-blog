'use client';

import Button from '@/components/Button';
import IconInput from '@/components/IconInput';
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { MdEmail, MdPerson, MdPhone } from 'react-icons/md';
export default function Page() {
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  return (
    <div className='relative flex min-h-screen w-full items-center justify-center'>
      <motion.div
        initial="hidden"
        animate="visible"
        className="container relative z-[20] flex w-full flex-col font-En"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text font-En text-6xl font-bold text-transparent">
            Contact
          </h1>
          <p className="mt-8 text-2xl font-semibold">
            Do you have a project you would like to request?
          </p>
        </motion.div>
        <div className="relative mt-20 flex gap-4">
          <motion.div
            variants={slideInFromLeft(0.8)}
            className="flex flex-[1] flex-col items-center justify-center gap-10"
          >
            <div className="relative size-[300px] bg-slate-400">
              <Image
                src="/images/QRCode.png"
                alt="MyPicture"
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div className="flex gap-8">
              <div className="flex items-center gap-2 font-En text-lg">
                <MdEmail className="text-gray-500 dark:text-gray-400" />
                <Link
                  href={`mailto:kimkuns98@gmail.com`}
                  className="hover:underline"
                >
                  kimkuns98@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-2 font-En text-lg">
                <MdPhone className="text-gray-500 dark:text-gray-400" />
                <Link href={`tel:01085959869`} className="hover:underline">
                  01085959869
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div variants={slideInFromRight(0.8)} className="flex-[1]">
            <form action="" className="flex flex-col gap-4">
              <IconInput
                icon={<MdEmail />}
                ref={emailRef}
                type="text"
                name="email"
                placeholder="name@flowbite.com"
              />
              <IconInput
                icon={<MdPerson />}
                ref={nameRef}
                type="text"
                name="name"
                placeholder="Name"
              />
              <IconInput
                icon={<MdPhone />}
                ref={nameRef}
                type="text"
                name="phone"
                placeholder="Phone"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="resize-none rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              <Button>Send</Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
