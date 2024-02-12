import { blackGreetings, whiteGreetings } from '@/libs/greetings/greetings';
import type { Message } from 'ai/react';
import { useChat } from 'ai/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import MessageWithAI from './MessageWithAI';

interface ChatRoomProps {
  selectRoom: string;
  image?: string;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ selectRoom, image }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState('');
  const [initialMessage, setInitialMessage] = useState<Message[]>([]);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      id: selectRoom,
      body: {
        roomId: selectRoom,
        mode,
      },
      api: '/api/chat/ai',
      initialMessages: initialMessage,
      sendExtraMessageFields: true,
      onFinish: async (message: Message) => {
        try {
          await axios.post(`/api/chat/messages/${selectRoom}`, { message });
        } catch (error) {
          console.error('Failed to send message:', error);
        }
      },
    });

  const handleSubmitModified = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const message = {
      content: input,
      role: 'user',
    };

    await axios.post(`/api/chat/messages/${selectRoom}`, { message });

    handleSubmit(e);
  };

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    (async () => {
      if (selectRoom) {
        try {
          const roomResponse = await axios.get(`/api/chat/room/${selectRoom}`);
          const messagesResponse = await axios.get(
            `/api/chat/messages/${selectRoom}`
          );
          setMode(roomResponse.data.mode);

          if (messagesResponse.data.length === 0) {
            const randomGreeting =
              roomResponse.data.mode === 'Black Mouse'
                ? blackGreetings[
                    Math.floor(Math.random() * blackGreetings.length)
                  ]
                : whiteGreetings[
                    Math.floor(Math.random() * whiteGreetings.length)
                  ];

            const initialMessage: Message = {
              id: 'assistant',
              content: randomGreeting,
              role: 'assistant',
            };
            setInitialMessage([initialMessage]);
            await axios.post(`/api/chat/messages/${selectRoom}`, {
              message: initialMessage,
            });
          } else {
            setInitialMessage(messagesResponse.data);
          }
        } catch (error) {
          console.error('Failed to load room or messages:', error);
        }
      }
    })();
  }, [selectRoom]);

  return (
    <div className="flex size-full flex-col px-4 py-6">
      <div
        ref={chatContainerRef}
        className="no-scrollbar flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6"
      >
        {messages.map((message) => (
          <MessageWithAI
            key={message.id}
            role={message.role}
            content={message.content}
            userImg={image}
            mode={mode}
          />
        ))}
      </div>
      <form
        className="mb-8 w-full"
        onSubmit={handleSubmitModified}
      >
        <div className="flex items-center justify-between rounded border border-slate-300 p-2 shadow-xl">
          <input
            className="flex-1 bg-transparent p-2 text-slate-100 placeholder:text-gray-500 focus:outline-none"
            value={input}
            placeholder="내용을 입력하세요."
            onChange={handleInputChange}
          />
          <button type="submit" className="ml-4 p-2" disabled={isLoading}>
            <FaPaperPlane className="text-slate-300" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoom;
