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
    <div className="container flex min-h-screen flex-col gap-8 py-40">
      <h1 className="text-4xl font-bold">{data?.title}</h1>
      <div className="flex flex-row items-center gap-2">
        <Link
          href={`/posts?category=${data?.category}`}
          className="rounded-md bg-slate-800 px-2 py-1 text-sm text-white"
        >
          {data?.category}
        </Link>
        {data?.tags.map((tag) => (
          <Link
            href={`/posts?tag=${tag}`}
            key={tag}
            className="rounded-md bg-slate-200 px-2 py-1 text-sm text-slate-500"
          >
            {tag}
          </Link>
        ))}
        <div className="text-sm text-gray-500">
          {format(new Date(data?.createdAt), 'yyyy년 M월 d일 HH:mm')}
        </div>
      </div>
      <div
        /* eslint-disable-next-line */
        className="quill-content"
        dangerouslySetInnerHTML={{ __html: data.content }}
      ></div>
    </div>
  );
}
