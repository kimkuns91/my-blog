import { cn } from '@/utils/style';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { CardBody, CardContainer, CardItem } from '../ui/3d-card';
interface PostCardProps {
  id: string;
  title: string;
  content: string;
  previewImageUrl: string | null;
  category: string;
  tags: string[];
  createdAt: Date;
  className?: string;
  published: boolean;
}

const PostCard: FC<PostCardProps> = ({
  id,
  title,
  content,
  previewImageUrl,
  category,
  tags,
  createdAt,
  className,
  published,
}) => {
  const createMarkup = (htmlString: string) => {
    const maxLength = 50;
    const strippedString = htmlString.replace(/<[^>]+>/g, ''); // HTML 태그 제거
    const trimmedString =
      strippedString.length > maxLength
        ? strippedString.substring(0, maxLength) + '...'
        : strippedString;
    return { __html: trimmedString };
  };

  return (
    <Link href={`/posts/${id}`}>
      <CardContainer>
        <CardBody
          className={cn(
            'relative h-[500px] w-[350px] cursor-pointer rounded-xl', // 고정 넓이와 높이 적용
            'border border-black/[0.1] bg-slate-900/70',
            'flex flex-col',
            'transition-all ease-in-out hover:shadow-xl hover:shadow-emerald-200/[0.1]'
          )}
        >
          <CardItem translateZ={70} className="h-[200px] w-full">
            <Image
              src={previewImageUrl || '/images/thumbnail.png'}
              alt="Sample image"
              layout="fill" // `layout`를 `fill`로 변경하여 부모 컨테이너에 맞춤
              className="rounded-t-xl object-cover" // `object-cover` 유지
            />
          </CardItem>

          <div className="flex flex-1 flex-col justify-between p-6">
            <CardItem
              translateZ={90}
              className={cn(
                'mt-2 px-5 py-1 text-xs font-normal',
                'rounded-full bg-gradient-to-b from-[#575757] to-[#363E4E]'
              )}
            >
              {category}
            </CardItem>
            <CardItem translateZ={90} className="mb-2 mt-4 text-xl font-bold">
              {title}
            </CardItem>
            <CardItem
              translateZ={85}
              className="mt-2 max-h-24 max-w-sm overflow-y-auto text-sm"
            >
              <p
                className="text-base text-gray-400"
                dangerouslySetInnerHTML={createMarkup(content)}
              />
            </CardItem>

            <CardItem
              translateZ={75}
              className="mt-10 flex w-full items-center justify-between"
            >
              <div className="flex gap-2">
                {tags.map((tag, index) => (
                  <CardItem
                    key={index}
                    translateZ={35}
                    as="p"
                    className={cn(
                      'rounded-md px-4 py-2 text-xs font-normal',
                      'bg-gradient-to-b from-[#353436] to-[#29282A]'
                    )}
                  >
                    {tag}
                  </CardItem>
                ))}
              </div>
              <p className="text-xs font-normal">
                {format(new Date(createdAt), 'yyyy년 M월 d일')}
              </p>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default PostCard;
