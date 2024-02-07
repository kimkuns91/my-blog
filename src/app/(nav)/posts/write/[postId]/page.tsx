'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useCategories, useTags } from '@/utils/hooks';
import { fetchPostByID } from '@/utils/server/serverActions';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import type { MultiValue } from 'react-select';
import ReactSelect from 'react-select/creatable';
import { toast } from 'react-toastify';
const QuillEidtor = dynamic(() => import('@/components/QuillEditor'), {
  loading: () => <div>...loading</div>,
  ssr: false,
});

type PostPageParams = {
  params: {
    postId: string;
  };
};

export default function Page({ params }: PostPageParams) {
  const postId = params.postId;
  const { data: session } = useSession();

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existingCategories } = useCategories();
  const { data: existingTags } = useTags();

  const [loading, setLoading] = useState<Boolean>(true);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return toast.error('제목을 입력해주세요.');
    if (category.length === 0) return toast.error('카테고리를 입력해주세요.');
    if (tags.length === 0) return toast.error('태그를 입력해주세요.');
    if (content.length === 0) return toast.error('글 내용을 입력해주세요.');

    const tagsValue = JSON.stringify(tags.map((tag) => tag.value));
    const formData = new FormData();
    formData.append('userId', session?.user.id!);
    formData.append('title', titleRef.current?.value);
    formData.append('category', category);
    formData.append('tags', tagsValue);
    formData.append('content', content);

    if (fileRef.current?.files?.[0]) {
      formData.append('previewImage', fileRef.current.files[0]);
    }

    try {
      const response = await axios.put(`/api/posts/${postId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push(`/posts/${response.data.postId}`);
      } else {
        toast.error('글 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Post creation failed:', error);
      toast.error('글 작성 중 에러가 발생했습니다.');
    }
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPostByID({ postId });
        if (data) {
          console.log(data);
          // title 필드 설정
          if (titleRef.current) {
            titleRef.current.value = data.title || '';
          }
          setCategory(data.category || '');
          if (data.tags) {
            const formattedTags = data.tags.map((tag) => ({
              label: tag,
              value: tag,
            }));
            setTags(formattedTags);
          }
          // content 상태 설정
          setContent(data.content || '');
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [postId]);

  if (loading) return null;

  return (
    <div className="container z-10 flex flex-col gap-6 pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 text-black">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input
            type="file"
            accept="image/*"
            ref={fileRef}
            className="bg-white"
          />
          <ReactSelect
            options={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
            instanceId="categories"
            value={existingCategories
              ?.map((c) => ({ label: c, value: c }))
              .find((c) => c.value === category)}
            onChange={(e) => e && setCategory(e.value)}
            isMulti={false}
          />
          <ReactSelect
            options={(existingTags ?? []).map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            instanceId="tags"
            value={tags} // 현재 태그 상태를 value로 설정
            onChange={(
              selectedOptions: MultiValue<{ label: string; value: string }>
            ) => {
              setTags([...selectedOptions]);
            }}
            isMulti
          />
          <QuillEidtor content={content} setContent={setContent} />
        </div>
        <Button type="submit" className="mt-4">
          수정하기
        </Button>
      </form>
    </div>
  );
}
