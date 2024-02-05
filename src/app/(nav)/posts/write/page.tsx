'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import QuillEidtor from '@/components/QuillEditor';
import { useCategories, useTags } from '@/utils/hooks';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';
import ReactSelect from 'react-select/creatable';
import { toast } from 'react-toastify';

export default function Page() {
  const { data: session } = useSession();

  const router = useRouter();

  const titleRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: existingCategories } = useCategories();
  const { data: existingTags } = useTags();

  console.log('existingCategories : ', existingCategories)

  console.log('existingTags : ', existingTags)


  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return alert('제목을 입력해주세요.');
    if (category.length === 0) return alert('카테고리를 입력해주세요.');
    if (tags.length === 0) return alert('태그를 입력해주세요.');
    if (content.length === 0) return alert('글 내용을 입력해주세요.');

    const formData = new FormData();
    formData.append('userId', session?.user.id!);
    formData.append('title', titleRef.current?.value);
    formData.append('category', category);
    formData.append('tags', tags);
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
        alert('글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('Post creation failed:', error);
      alert('글 작성 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="container flex flex-col pb-20 pt-12 gap-6">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 text-black">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input type="file" accept="image/*" ref={fileRef} />
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
            onChange={(e) =>
              e && setTags(JSON.stringify(e.map((e) => e.value)))
            }
            instanceId="tags"
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
