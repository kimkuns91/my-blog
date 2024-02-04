'use client';

import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith('/dashboard')) return null;
  return (
    <div className="border-t border-slate-200 bg-slate-800">
      <div className="container flex flex-col items-center justify-center gap-4 py-6">
        <h2>Copyright © 2024 White Mouse Dev</h2>
      </div>
    </div>
  );
};

export default Footer;
