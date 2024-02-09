'use client';

import NavMenu from '@/libs/constants/navMenu';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Profile from './Profile';

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 z-[30] w-full bg-[#03001417] shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <div className="flex-1">
          <Link href={'/'}>
            <Image
              src={'/images/Logo.png'}
              className="transition-all ease-in-out hover:opacity-60"
              alt="logo"
              width={240}
              height={0}
              priority
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between gap-4 rounded-full bg-[#0300145e] px-10 py-4">
          {NavMenu.map((menu, index) => (
            <Link
              className="font-En text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
              href={menu.url}
              key={index}
            >
              {menu.menu}
            </Link>
          ))}
        </div>
        <div className="flex flex-1 items-center justify-end gap-6">
          {!session ? (
            <>
              <Link
                className="font-En text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
                href={'/login'}
              >
                Login
              </Link>
              <Link
                className="font-En text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
                href={'/regist'}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Profile />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
