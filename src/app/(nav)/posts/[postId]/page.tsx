import PostDoc from '@/components/posts/PostDoc';
import { authOptions } from '@/libs/next-auth';
import { getPost } from '@/utils/fetch';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

type PostProps = {
  params: {
    postId: string;
  };
};

export const generateMetadata = async ({
  params,
}: PostProps): Promise<Metadata> => {
  const postId = params.postId;
  const post = await getPost(postId);

  return {
    title: post?.title,
    description: post?.content?.split('.')[0],
    openGraph: post?.previewImageUrl
      ? {
          images: [
            {
              url: post.previewImageUrl,
            },
          ],
        }
      : undefined,
  };
};

export default async function PostPage({ params }: PostProps) {
  const session = await getServerSession(authOptions);
  const { id: sessionId, role: sessionRole } = session?.user ?? {};

  const post = await getPost(params.postId);

  if (!post) return notFound();

  return <PostDoc {...post} sessionId={sessionId} sessionRole={sessionRole} />;
}
