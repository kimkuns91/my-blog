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
  published: boolean;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  previewImageUrl,
  category,
  tags,
  className,
  published,
}) => {
  return (
    <Link
      href={`/posts/${id}`}
      className={cn(
        'max-w-sm overflow-hidden rounded border border-slate-700 bg-[#030014] transition-all hover:shadow-2xl hover:shadow-[#9C5CF4]/50',
        `${!published && 'border-4 border-red-500'}`,
        className
      )}
    >
      <div className="relative aspect-[1.8/1] w-full">
        <Image
          src={previewImageUrl || '/images/thumbnail.png'}
          fill
          sizes="360px"
          alt={title}
          className="object-cover"
          priority
        />
      </div>
      <div className="px-6 py-4">
        <h2 className="ellipsis mb-2 text-xl font-bold">{title}</h2>
      </div>
      <div className={cn("hidden px-6 pb-2 pt-4", 'lg:block')}>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-400 px-3 py-1 text-sm font-semibold text-gray-700">
          {category}
        </span>
        {Array.isArray(tags) &&
          tags.map((tag) => (
            <span
              key={tag}
              className="mb-2 mr-2 inline-block rounded-full bg-gray-200 px-3 py-1 text-sm font-semibold text-gray-700"
            >
              {tag}
            </span>
          ))}
      </div>
    </Link>
  );
};

export default PostCard;
