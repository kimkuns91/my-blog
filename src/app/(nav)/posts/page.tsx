import PostContainer from '@/components/posts/PostContainer';
import { authOptions } from '@/libs/next-auth';
import { getPosts } from '@/utils/fetch';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

export const metadata: Metadata = {
  title: 'WhiteMouseDev - Posts',
  description: '개발 관련 이야기를 나누는 블로그입니다.',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  let category = '';
  let tag = '';

  if (searchParams?.category) {
    category = decodeURIComponent(searchParams.category);
  }
  if (searchParams?.tag) {
    tag = decodeURIComponent(searchParams.tag);
  }

  const posts = await getPosts({
    category,
    tag,
    role,
  });

  return (
    <PostContainer
      category={searchParams?.category}
      tag={searchParams?.tag}
      posts={posts}
      role={role}
    />
  );
}
