import { cn } from '@/utils/style';
import Image from 'next/image';

interface MessageWithAIProps {
  role: string;
  content: string;
  userImg?: string;
  mode: string;
}
const MessageWithAI: React.FC<MessageWithAIProps> = ({
  role,
  content,
  userImg = '/images/noUser.png',
  mode,
}) => {
  return (
    <div
      className={cn(
        'flex items-start gap-4',
        `${role === 'assistant' ? 'justify-start' : 'justify-end'}`
      )}
    >
      {role === 'assistant' && (
        <div className="relative size-16 overflow-hidden rounded-full border-2 border-pink-300 shadow-lg">
          <Image
            src={
              mode === 'Black Mouse'
                ? '/images/WhiteMouseAI.png'
                : '/images/ContactImg.webp'
            }
            alt="WhiteMouseAI"
            className="object-cover"
            sizes="64px"
            fill
            priority
          />
        </div>
      )}
      <div className="max-w-xs whitespace-pre-wrap rounded-lg bg-slate-200/20 px-6 py-4 shadow-md md:max-w-md lg:max-w-lg">
        {content}
      </div>
      {role === 'user' && (
        <div className="relative size-16 overflow-hidden rounded-full border-2 border-blue-300 shadow-lg">
          <Image
            src={userImg}
            alt="User"
            className="object-cover"
            sizes="64px"
            fill
            priority
          />
        </div>
      )}
    </div>
  );
};

export default MessageWithAI;
