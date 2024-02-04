'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { MarkdownEditor } from '@/components/Markdown';
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

  const [existingCategories, setExistingCategories] = useState([]);
  const [existingTags, setExistingTags] = useState([]);

  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(titleRef.current?.value);
    if (!titleRef.current?.value || titleRef.current.value.length === 0)
      return alert('제목을 입력해주세요.');
    if (category.length === 0) return alert('카테고리를 입력해주세요.');
    if (tags.length === 0) return alert('태그를 입력해주세요.');
    if (content.length === 0) return alert('글 내용을 입력해주세요.');

    const postData = {
      userId: session?.user.id,
      title: titleRef.current.value,
      category,
      tags,
      content,
    };

    try {
      const response = await axios.post('/api/posts', postData);
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
    <div className="container flex flex-col pb-20 pt-12">
      <h1 className="mb-8 text-2xl font-medium">새로운 글</h1>
      <form onSubmit={handleSubmit} className="text-black">
        <div className="flex flex-col gap-3">
          <Input type="text" placeholder="제목" ref={titleRef} />
          <Input type="file" accept="image/*" ref={fileRef} />
          <ReactSelect
            options={(existingCategories ?? []).map((category) => ({
              label: category,
              value: category,
            }))}
            placeholder="카테고리"
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
            isMulti
          />
          <MarkdownEditor
            height={500}
            value={content}
            onChange={(s) => setContent(s ?? '')}
          />
        </div>
        <Button type="submit" className="mt-4">
          작성하기
        </Button>
      </form>
    </div>
  );
}
