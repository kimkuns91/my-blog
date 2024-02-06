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
    <div className='w-full min-h-screen relative flex items-center justify-center'>
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative container flex flex-col font-En w-full z-[20]"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="font-En text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Contact
          </h1>
          <p className="text-2xl font-semibold mt-8">
            Do you have a project you would like to request?
          </p>
        </motion.div>
        <div className="flex gap-4 mt-20 relative">
          <motion.div
            variants={slideInFromLeft(0.8)}
            className="flex-[1] flex flex-col items-center justify-center gap-10"
          >
            <div className="relative w-[300px] h-[300px] bg-slate-400">
              <Image
                src="/images/QRCode.png"
                alt="MyPicture"
                fill
                sizes="360px"
                className="object-cover"
              />
            </div>
            <div className="flex gap-8">
              <div className="font-En text-lg flex items-center gap-2">
                <MdEmail className="text-gray-500 dark:text-gray-400" />
                <Link
                  href={`mailto:kimkuns98@gmail.com`}
                  className="hover:underline"
                >
                  kimkuns98@gmail.com
                </Link>
              </div>
              <div className="font-En text-lg flex items-center gap-2">
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
                className="resize-none p-4 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <Button>Send</Button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
