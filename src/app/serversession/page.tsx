import { authOptions } from '@/libs/next-auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Page() {
  const session = await getServerSession(authOptions)
  return (
    <div className="z-20 flex h-screen w-full flex-col items-center justify-center gap-20 ">
      <h2>Session : {JSON.stringify(session)}</h2>
      <Link href={'/clientsession'}>clientsession</Link>
    </div>
  );
}
