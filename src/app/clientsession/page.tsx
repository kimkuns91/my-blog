'use client';

import { useAuthStore } from '@/stores/authStore';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Page() {
  const { data: session, status } = useSession();
  const { user } = useAuthStore();
  return (
    <div className="z-20 flex h-screen w-full flex-col items-center justify-center gap-20">
      <h2>Session : {JSON.stringify(session)}</h2>
      <h2>Status : {JSON.stringify(status)}</h2>
      <h2>User : {JSON.stringify(user)}</h2>
      <Link href={'/serversession'}>serversession</Link>
    </div>
  );
}
