import prisma from '@/libs/prisma';

type PostPageParams = {
  params: {
    postId: string;
  };
};

async function getData({ postId }: { postId: string }) {
  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    return data;
  } catch (error) {
    // throw new Error('Failed to fetch data: ' + (error as Error).message);
  }
}

export default async function PostPage({ params }: PostPageParams) {
  const data = await getData({ postId: params.postId });
  console.log('data : ', data);
  if (!data) return null;

  return (
    <div>
      {params.postId}
      <h2>{data?.title}</h2>
      <h2>{data?.category}</h2>
      <h2>{data?.tags}</h2>
      <h2>{data?.content}</h2>
      <h2>{JSON.stringify(data?.createdAt)}</h2>
      <h2>{data.updatedAt && JSON.stringify(data.updatedAt)}</h2>
    </div>
  );
}
