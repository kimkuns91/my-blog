import ChatContainer from '@/components/chat/ChatContainer';
import { authOptions } from '@/libs/next-auth';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'WhiteMouseDev - AI Chat',
  description: 'WhiteMouseDev AI와 대화해보세요.',
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  return <ChatContainer session={session} />;
}
