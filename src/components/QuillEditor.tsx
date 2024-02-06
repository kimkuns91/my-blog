'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';

import { supabase } from '@/libs/supabase';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import type ReactQuill from 'react-quill';
import { Quill, ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
interface QuillEditorProps {
  content: string;
  setContent: (char: string) => void;
}
interface ForwardedQuillComponent extends ReactQuillProps {
  forwardedRef: React.Ref<ReactQuill>;
}

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    const Quill = ({ forwardedRef, ...props }: ForwardedQuillComponent) => (
      <RQ ref={forwardedRef} {...props} />
    );
    return Quill;
  },
  { loading: () => <div>...loading</div>, ssr: false }
);

const formats = [
  'font',
  'size',
  'header',
  'color',
  'background',
  'bold',
  'italic',
  'align',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'formula',
  'float',
  'height',
  'width',
];
const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large', 'huge'];
Quill.register(Size, true);

const QuillEditor: React.FC<QuillEditorProps> = ({ content, setContent }) => {
  const quillRef = useRef<ReactQuill>(null);
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const uniqueFileName = uuidv4();
      const filePath = `uploads/images/${uniqueFileName}`; // 파일을 저장할 경로와 파일 이름
      const contentType = file.type; // 파일의 MIME 타입

      try {
        const { error: uploadError, data } = await supabase.storage
          .from('images') // 스토리지 버킷 이름
          .upload(filePath, file, {
            contentType,
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const publicUrl = `https://rgvzlonuavmjvodmalpd.supabase.co/storage/v1/object/public/images/${data?.path}`;
        console.log('publicUrl:', publicUrl);
        // 에디터에 이미지 URL을 삽입합니다.
        const editor = quillRef.current;
        if (editor) {
          const range = editor.getEditor().getSelection(true);
          if (range) {
            // insertEmbed의 첫 번째 인자는 커서 위치(index)입니다.
            editor.getEditor().insertEmbed(range.index, 'image', publicUrl);
            editor.getEditor().setSelection(range.index + 1, 0);
          }
        }
      } catch (error: any) {
        console.error('Error uploading image: ', error.message);
      }
    };
  };

  const modules = useMemo(() => {
    return {
      imageActions: {},
      imageFormats: {},
      toolbar: {
        container: [
          [{ font: [] }],
          [{ header: '1' }, { header: '2' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          [{ color: [] }, { background: [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      },
    };
  }, []);

  return (
    <div>
      <QuillWrapper
        forwardedRef={quillRef}
        style={{
          width: '100%',
          backgroundColor: '#FFF',
        }}
        theme="snow"
        placeholder={'내용을 입력해주세요.'}
        defaultValue={content}
        value={content}
        onChange={(value) => setContent(value)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;