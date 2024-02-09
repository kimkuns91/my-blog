import PostDoc from '@/components/posts/PostDoc';
import { getPost } from '@/utils/fetch';
import { Metadata } from 'next';
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
  const postId= params.postId
  console.log('postId : ', postId)
  const post = await getPost(postId);

  if (!post) return notFound();

  return <PostDoc {...post} />;
}
