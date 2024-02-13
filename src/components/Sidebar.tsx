import { cn } from '@/utils/style';

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
          `h-full max-w-[330px] bg-white transition-all duration-500 ease-in-out`,

          sideBarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        onClick={(e) => e.stopPropagation()}
      ></div>
    </div>
  );
};

export default Sidebar;
