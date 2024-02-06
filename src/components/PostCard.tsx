import { cn } from '@/utils/style';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  previewImageUrl: string | null;
  category: string;
  tags: string[];
  className?: string;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  previewImageUrl,
  category,
  tags,
  className,
}) => {
  // console.log(tags);
  return (
    <Link
      href={`/posts/${id}`}
      className={cn(
        'max-w-sm rounded overflow-hidden hover:shadow-2xl border bg-[#030014] border-slate-700 transition-all backdrop-blur-m hover:shadow-[#9C5CF4]/50',
        className
      )}
    >
      <div className="relative aspect-[1.8/1] w-full ">
        <Image
          src={previewImageUrl || '/images/thumbnail.png'}
          fill
          sizes="360px"
          alt={title}
          className="object-cover"
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2 ellipsis">{title}</h2>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-400 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {category}
        </span>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              {tag}
            </span>
          ))}
      </div>
    </Link>
  );
};

export default PostCard;
