import { Post } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import PostControlBar from './PostControlBar';

interface PostDocProps {
  post: Post;
}

const PostDoc: React.FC<PostDocProps> = ({ post }) => {
  return (
    <div className="container z-10 flex min-h-screen flex-col gap-8 py-40">
      <div className="flex flex-col items-center gap-8 pt-10">
        {post.category && (
          <Link
            href={`/posts?category=${post.category}`}
            className="rounded-full bg-gradient-to-br from-[#BAC0C5] to-[#2F4153] px-6 py-2 text-sm text-white transition-all ease-in-out hover:opacity-60 lg:text-2xl"
          >
            {post.category}
          </Link>
        )}
        <h1 className="bg-gradient-to-b from-[#48B6F5] to-[#085A8A] bg-clip-text text-center font-En text-6xl font-bold text-transparent">
          {post.title}
        </h1>
        <div className="flex w-full justify-between">
          <div className="flex flex-row items-center gap-2">
            {post?.tags.map((tag) => (
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
            {format(new Date(post?.createdAt), 'yyyy년 M월 d일 HH:mm')}
          </div>
        </div>
      </div>
      <PostControlBar
        postId={post.id}
        published={post.published}
        userId={post.userId}
      />
      <div
        /* eslint-disable-next-line */
        className="quill-content py-20"
        dangerouslySetInnerHTML={{ __html: post.content }}
      ></div>
    </div>
  );
};

export default PostDoc;
