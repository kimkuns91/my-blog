'use client';

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from '@/utils/motion';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ChatRoom from './ChatRoom';
import ChatSideBar from './ChatSideBar';
import CreateRoom from './CreateRoom';

interface ChatContainerProps {
  session: Session | null;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ session }) => {
  const router = useRouter();
  const [userId, setUserId] = useState('');
  const [rooms, setRooms] = useState([]);
  const [selectRoom, setSelectRoom] = useState<string | null>(null);
  const [createRoomMode, setCreateRoomMode] = useState(false);

  const fetchRooms = useCallback(async () => {
    if (!session) {
      toast.error('로그인이 필요한 서비스입니다.');
      router.push('/login');
    } else {
      try {
        const response = await axios.get(`/api/chat/${session.user.id}`);
        setUserId(session.user.id);
        setRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    }
  }, [session, router]);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  return (
    <div className="flex h-screen w-full items-center justify-center py-32">
      <motion.div
        initial="hidden"
        animate="visible"
        className="container relative z-[20] flex size-full flex-col"
      >
        <motion.div variants={slideInFromTop} className="opacity-[0.9]">
          <h1 className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text  text-6xl font-bold text-transparent">
            Chat With AI
          </h1>
        </motion.div>
        <div className="mt-20 flex min-h-0 flex-1 gap-4">
          <motion.div
            variants={slideInFromLeft(0.8)}
            className="flex min-w-[200px] flex-col gap-10 rounded-md border border-slate-500 bg-slate-600/30"
          >
            <ChatSideBar
              rooms={rooms}
              selectRoom={selectRoom}
              setSelectRoom={setSelectRoom}
              setCreateRoomMode={setCreateRoomMode}
              fetchRooms={fetchRooms}
            />
          </motion.div>
          <motion.div
            variants={slideInFromRight(0.8)}
            className="flex-1 rounded-md border border-slate-500 bg-slate-600/30"
          >
            {selectRoom && (
              <ChatRoom selectRoom={selectRoom} image={session?.user.image} />
            )}
          </motion.div>
        </div>
      </motion.div>
      {createRoomMode && (
        <CreateRoom
          userId={userId}
          setSelectRoom={setSelectRoom}
          setCreateRoomMode={setCreateRoomMode}
          fetchRooms={fetchRooms}
        />
      )}
    </div>
  );
};
export default ChatContainer;
