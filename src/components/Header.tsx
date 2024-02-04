"use client";

import NavMenu from "@/libs/constants/navMenu";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Profile from "./Profile";

const Header = () => {
  const { data: session, status } = useSession();
  return (
    <header>
      <div className="container flex items-center justify-between py-4">
        <div className="flex-1">
          <Link href={"/"}>
            <Image src={"/images/Logo.png"} alt="logo" width={60} height={0} />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-between gap-4">
          {NavMenu.map((menu, index) => (
            <Link className="font-En text-xl font-semibold" href={menu.url} key={index}>
              {menu.menu}
            </Link>
          ))}
        </div>
        <div className="flex-1 flex items-center justify-end gap-4">
          {!session ? (
            <>
              <Link href={"/login"}>Login</Link>
              <Link href={"/regist"}>Regist</Link>
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
