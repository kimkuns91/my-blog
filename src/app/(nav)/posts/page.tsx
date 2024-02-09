import PostContainer from '@/components/posts/PostContainer';
import { getPosts } from '@/utils/fetch';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WhiteMouseDev - Posts',
  description: '개발 관련 이야기를 나누는 블로그입니다.',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
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
  });
  return (
    <PostContainer
      category={searchParams?.category}
      tag={searchParams?.tag}
      posts={posts}
    />
  );
}
