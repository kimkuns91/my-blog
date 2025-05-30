'use client';

import { useRouter } from 'next/navigation';

interface CourseHeaderProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center bg-[#B6D5F6] p-4 text-black">
      <button onClick={() => router.back()}>&larr; 뒤로가기</button>
      <button onClick={handleSideBar}>{isOpen ? '닫기' : '열기'}</button>
    </div>
  );
};
export default CourseHeader;
