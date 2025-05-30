'use client';

import { cn } from '@/utils/style';
import Link from 'next/link';

interface CourseSideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CourseSideBar: React.FC<CourseSideBarProps> = ({ isOpen, setIsOpen }) => {
  const lectures = ['Lecture 1', 'Lecture 2']; // 예시 데이터

  return (
    <div
      className={cn(
        'flex w-64',
        isOpen ? 'hidden' : 'block',
        'h-full bg-[#CCEAF5] p-5'
      )}
    >
      <ul className="bg-pink-500">
        {lectures.map((lecture, index) => (
          <li key={index}>
            <Link href={`/lecture/${index + 1}`}>{lecture}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default CourseSideBar;
