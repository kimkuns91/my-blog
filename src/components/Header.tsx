'use client';

import NavMenu from '@/libs/constants/navMenu';
import { cn } from '@/utils/style';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import Profile from './Profile';
import Sidebar from './Sidebar';

const Header = () => {
  const { data: session } = useSession();
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 z-[30] w-full bg-[#03001417] shadow-lg shadow-[#2A0E61]/50 backdrop-blur-md">
      <div className="container flex items-center justify-between py-4">
        <div className={cn('flex-1', 'lg:hidden')}>
          <FaBars
            onClick={() => {
              setSideBarOpen(true);
            }}
            className="text-xl"
          />
        </div>
        <div className={cn('mr-6 flex-[2]', 'lg:mr-0 lg:flex-1')}>
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
        <div
          className={cn(
            'hidden flex-1 items-center justify-between gap-4 rounded-full bg-[#0300145e] px-10 py-4',
            'lg:flex'
          )}
        >
          {NavMenu.map((menu, index) => (
            <Link
              className={cn(
                'text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent'
              )}
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
                className=" text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
                href={'/login'}
              >
                Login
              </Link>
              <Link
                className=" text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
                href={'/regist'}
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Profile name={session.user.name} imageUrl={session.user.image} />
          )}
        </div>
      </div>
      {sideBarOpen && (
        <Sidebar sideBarOpen={sideBarOpen} setSideBarOpen={setSideBarOpen} />
      )}
    </header>
  );
};

export default Header;
