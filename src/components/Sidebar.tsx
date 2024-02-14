import NavMenu from '@/libs/constants/navMenu';
import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';

interface SidebarProps {
  sideBarOpen: boolean;
  setSideBarOpen: (sideBarOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sideBarOpen, setSideBarOpen }) => {
  return (
    <div
      onClick={() => {
        setSideBarOpen(false);
      }}
      className="fixed left-0 top-0 h-screen w-full bg-slate-900/90"
    >
      <div
        className={cn(
          `sideBar flex h-full max-w-[330px] flex-col border-r border-slate-700 bg-slate-900 px-6 py-8`
        )}
      >
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
        {NavMenu.map((menu, index) => (
          <Link
            className=" text-xl font-semibold transition-all ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 hover:bg-clip-text hover:text-transparent"
            href={menu.url}
            key={index}
          >
            {menu.menu}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
