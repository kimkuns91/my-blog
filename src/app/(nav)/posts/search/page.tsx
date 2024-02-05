"use client"

import { useSearchParams } from "next/navigation";

export default function Page(){
  const searchParams = useSearchParams();

  const keyword = searchParams.get('keyword');
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  return(
    <div>{keyword}{category}{tag}</div>
  )
}