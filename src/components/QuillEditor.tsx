'use client';

import dynamic from 'next/dynamic';

import type ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  content: string;
  setContent: (char: string) => void;
}

const QuillWrapper = dynamic(
  async () => {
    const { default: RQ } = await import('react-quill');
    return ({ ...props }) => <RQ {...props} />;
  },
  {
    ssr: false,
  }
) as typeof ReactQuill;

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
];

const QuillEditor = ({ content, setContent }: QuillEditorProps) => {
  return (
    <QuillWrapper
      style={{
        width: '100%',
      }}
      theme="snow"
      placeholder={'내용을 입력해주세요.'}
      defaultValue={content}
      value={content}
      onChange={(value) => setContent(value)}
      modules={modules}
      formats={formats}
    />
  );
};

export default QuillEditor;
