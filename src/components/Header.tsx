"use client";

import NavMenu from "@/libs/constants/navMenu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header className="w-full fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-[30]">
      <div className="container flex items-center justify-between py-4">
        <div className="flex-1">
          <Link href={"/"} >
            <Image src={"/images/Logo.png"} className="ease-in-out transition-all hover:opacity-60" alt="logo" width={240} height={0} />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-between gap-4 rounded-full bg-[#0300145e] py-4 px-10">
          {NavMenu.map((menu, index) => (
            <Link className="font-En text-xl font-semibold ease-in-out transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500" href={menu.url} key={index}>
              {menu.menu}
            </Link>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-end gap-6">
          {!session ? (
            <>
              <Link className="font-En text-xl font-semibold ease-in-out transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500" href={"/login"}>Login</Link>
              <Link className="font-En text-xl font-semibold ease-in-out transition-all hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500" href={"/regist"}>Sign Up</Link>
            </>
          ) : (
            <Profile
              role={session?.user.role}
              name={session?.user.name}
              imageUrl={session?.user.image}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
