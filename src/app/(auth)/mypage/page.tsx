import MyPageForm from '@/components/mypage/MyPageForm';
import { authOptions } from '@/libs/next-auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/login');
  }

  return <MyPageForm userId={session.user.id} />;
}
