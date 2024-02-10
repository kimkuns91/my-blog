'use client';

import { greetings } from '@/libs/greetings/greetings';
import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import { toast } from 'react-toastify';
import MessageWithAI from './MessageWithAI';

type MessageRole =
  | 'function'
  | 'data'
  | 'system'
  | 'user'
  | 'assistant'
  | 'tool';

type Message = {
  id: string;
  content: string;
  role: MessageRole;
};

const ChatWithAI = () => {
  const router = useRouter();
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const { data: session } = useSession();
  const [initialMessage, setInitialMessage] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat/ai',
      initialMessages: initialMessage,
      onFinish: () => {},
    });

  useEffect(() => {
    // 채팅 컨테이너의 스크롤을 조정하여 메시지 목록의 가장 아래로 이동
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!session) {
      toast.error('로그인이 필요한 서비스입니다. 찍찍!');
      router.push('/login');
    }
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    setInitialMessage([
      {
        id: 'assistant',
        content: randomGreeting,
        role: 'assistant',
      },
    ]);
  }, [session, router]);

  return (
    <div className="relative z-20 mx-auto flex h-screen w-full max-w-2xl flex-col py-24">
      <div
        ref={chatContainerRef}
        className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto py-8"
      >
        {messages.map((message) => (
          <MessageWithAI
            key={message.id}
            role={message.role}
            content={message.content}
            userImg={session?.user.image}
          />
        ))}
      </div>
      <form
        className="absolute bottom-0 left-1/2 mb-8 w-full max-w-md -translate-x-1/2"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-between rounded border border-gray-300 bg-white p-2 shadow-xl">
          <input
            className="flex-1 bg-transparent p-2 text-black placeholder:text-gray-500 focus:outline-none"
            value={input}
            placeholder="내용을 입력하세요."
            onChange={handleInputChange}
          />
          <button type="submit" className="ml-4 p-2" disabled={isLoading}>
            <FaPaperPlane className="text-slate-700" />
          </button>
        </div>
      </form>
    </div>
  );
};
export default ChatWithAI;
