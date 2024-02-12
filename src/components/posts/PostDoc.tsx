import { Post } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';
import PostControlBar from './PostControlBar';


type PostDocProps = Post & {
  sessionId?: string;
  sessionRole?: string;
};

const PostDoc: FC<PostDocProps> = ({
  id,
  title,
  category,
  tags,
  content,
  createdAt,
  published,
  userId,
  sessionId,
  sessionRole,
}) => {
  return (
    <div className="container z-10 flex min-h-screen flex-col gap-8 py-40">
      <div className="flex flex-col items-center gap-8 pt-10">
        {category && (
          <Link
            href={`/posts?category=${category}`}
            className="rounded-full bg-gradient-to-br from-[#BAC0C5] to-[#2F4153] px-6 py-2 text-sm text-white transition-all ease-in-out hover:opacity-60 lg:text-2xl"
          >
            {category}
          </Link>
        )}
        <h1 className="bg-gradient-to-b from-[#48B6F5] to-[#085A8A] bg-clip-text text-center  text-6xl font-bold text-transparent">
          {title}
        </h1>
        <div className="flex w-full justify-between">
          <div className="flex flex-row items-center gap-2">
            {tags.map((tag) => (
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
            {format(new Date(createdAt), 'yyyy년 M월 d일 HH:mm')}
          </div>
        </div>
      </div>
      <PostControlBar
        postId={id}
        published={published}
        userId={userId}
        sessionId={sessionId}
        sessionRole={sessionRole}
      />
      <div
        /* eslint-disable-next-line */
        className="quill-content py-20"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default PostDoc;
