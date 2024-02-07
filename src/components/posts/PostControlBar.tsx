'use client';

import { handlePostPublished } from '@/utils/server/serverActions';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaHeart, FaPen, FaShareAlt, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface PostControlBarProps {
  postId: string;
  published: boolean;
  userId: string;
}

const PostControlBar: React.FC<PostControlBarProps> = ({
  postId,
  published: initialPublished,
  userId,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [published, setPublished] = useState(initialPublished);
  const handleDelete = async () => {
    if (window.confirm('해당 글을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(`/api/posts/${postId}`);
        if (response.status === 201) {
          toast.success('해당 글이 삭제되었습니다.');
          router.push('/posts');
        }
      } catch (error: any) {
        toast.error('글 삭제를 실패하였습니다.');
        console.error('글 삭제를 실패하였습니다. ', error.message);
      }
    }
    return;
  };

  const handlePublished = async () => {
    try {
      const response = await handlePostPublished({ postId });
      setPublished(response.published); // 성공적으로 상태 변경 후, 로컬 상태 업데이트
      toast.success(
        `해당 글이 ${
          response.published ? '공개' : '비공개'
        } 상태로 바뀌었습니다.`
      );
    } catch (error: any) {
      toast.error('공개/비공개 설정을 실패하였습니다.');
      console.error('공개/비공개 설정을 실패하였습니다.', error.message);
    }
  };
  return (
    <div className="flex w-full flex-col gap-4 border-b border-slate-400 py-8 text-lg">
      <div className="flex w-full items-center justify-end gap-4">
        <button className="transition-all ease-in-out hover:opacity-30">
          <FaHeart />
        </button>
        <button className="transition-all ease-in-out hover:opacity-30">
          <FaShareAlt />
        </button>
      </div>
      {session && session.user.id === userId && (
        <div className="flex w-full items-center justify-end gap-4">
          <Link
            href={`/posts/write/${postId}`}
            className="transition-all ease-in-out hover:opacity-30"
          >
            <FaPen />
          </Link>
          <button
            onClick={handleDelete}
            className="transition-all ease-in-out hover:opacity-30"
          >
            <FaTrash />
          </button>
          <button
            onClick={handlePublished}
            className="transition-all ease-in-out hover:opacity-30"
          >
            {published ? '공개' : '비공개'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostControlBar;
