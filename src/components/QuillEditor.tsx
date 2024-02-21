'use client';

import { useMemo, useRef } from 'react';

import { supabase } from '@/libs/supabase';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import hljs from 'highlight.js';
import c from "highlight.js/lib/languages/c";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import 'highlight.js/styles/github.css';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { v4 as uuidv4 } from 'uuid';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
interface QuillEditorProps {
  content: string;
  setContent: (char: string) => void;
}

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("c", c);
hljs.configure({
  languages: ['javascript', 'ruby', 'python', 'java', 'cpp', 'kotlin', 'sql']
});

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
  'code-block'
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
      syntax: {
        highlight: (text: any) => hljs.highlightAuto(text).value,
      },
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
          ['code-block'],
          [{ color: [] }, { background: [] }],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: false,
      },
    };
  }, []);
  
  return (
    <div>
      <ReactQuill
        ref={quillRef}
        style={{
          width: '100%',
          backgroundColor: '#FFF',
        }}
        theme="snow"
        placeholder={'내용을 입력해주세요.'}
        defaultValue={content}
        value={content}
        onChange={(content, delta, source, editor) =>
          setContent(editor.getHTML())
        }
        // onChange={(value) => setContent(value)}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default QuillEditor;
