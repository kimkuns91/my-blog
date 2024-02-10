import ChatWithAI from '@/components/chat/ChatWithAI';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhiteMouseDev - AI Chat',
  description: 'WhiteMouseDev AI와 대화해보세요.',
};

export default async function Page() {
  return <ChatWithAI />;
}
