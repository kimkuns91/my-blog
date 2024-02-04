'use client';

import { toast } from 'react-toastify';

export default function Page() {
  return (
    <div>
      <button
        onClick={() => {
          toast.success('안녕');
        }}
      >
        버튼
      </button>
    </div>
  );
}
