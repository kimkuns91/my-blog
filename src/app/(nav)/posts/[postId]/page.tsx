import PostControlBar from '@/components/posts/PostControlBar';
import prisma from '@/libs/prisma';
import { format } from 'date-fns';
import Link from 'next/link';

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
    throw new Error('Failed to fetch data: ' + (error as Error).message);
  }
}

export default async function PostPage({ params }: PostPageParams) {
  const data = await getData({ postId: params.postId });
  if (!data) return null;

  return (
    <div className="container z-10 flex min-h-screen flex-col gap-8 py-40">
      <div className="flex flex-col items-center gap-8 pt-10">
        {data.category && (
          <Link
            href={`/posts?category=${data.category}`}
            className="rounded-full bg-gradient-to-br from-[#BAC0C5] to-[#2F4153] px-6 py-2 text-sm text-white transition-all ease-in-out hover:opacity-60 lg:text-2xl"
          >
            {data.category}
          </Link>
        )}
        <h1 className="bg-gradient-to-b from-[#48B6F5] to-[#085A8A] bg-clip-text text-center font-En text-6xl font-bold text-transparent">
          {data.title}
        </h1>
        <div className="flex w-full justify-between">
          <div className="flex flex-row items-center gap-2">
            {data?.tags.map((tag) => (
              <Link
                href={`/posts?tag=${tag}`}
                key={tag}
                className="rounded-md bg-slate-200 px-2 py-1 text-sm text-slate-500"
              >
                {tag}
              </Link>
            ))}
          </div>
          <div className="text-sm text-gray-500 lg:text-lg">
            {format(new Date(data?.createdAt), 'yyyy년 M월 d일 HH:mm')}
          </div>
        </div>
      </div>
      <PostControlBar
        postId={data.id}
        published={data.published}
        userId={data.userId}
      />
      <div
        /* eslint-disable-next-line */
        className="quill-content py-20"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    </div>
  );
}
