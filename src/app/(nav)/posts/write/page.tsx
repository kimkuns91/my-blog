'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useCategories, useTags } from '@/utils/hooks';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import { MultiValue } from 'react-select';
import ReactSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

const QuillEidtor = dynamic(async () => await import('@/components/QuillEditor'), {
  ssr: false,
});

export default function Page() {
  const { data: session } = useSession();

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existingCategories } = useCategories();
  const { data: existingTags } = useTags();

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
      const response = await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // FormData를 사용할 때 필요한 헤더
        },
      });
      if (response.status === 201) {
        toast.success(response.data.message);
        router.push(`/posts/${response.data.postId}`);
      } else {
        toast.error('글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Post creation failed:', error);
      toast.error('글 작성 중 에러가 발생했습니다.');
    }
  };

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
            onChange={(e) => e && setCategory(e?.value)}
            isMulti={false}
          />
          <ReactSelect
            options={(existingTags ?? []).map((tag) => ({
              label: tag,
              value: tag,
            }))}
            placeholder="태그"
            instanceId="tags"
            value={tags}
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
          작성하기
        </Button>
      </form>
    </div>
  );
}
