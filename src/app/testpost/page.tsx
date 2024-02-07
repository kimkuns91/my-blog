import PostList from '@/components/test/PostList';
import { Post } from '@prisma/client';

async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/testpost`);

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data: Post[] = await response.json();
    console.log('Fetched Data: ', data);

    return data ?? [];
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    throw error; // Re-throw the error to handle it in the component that calls getPosts
  }
}

export default async function Page() {
  const data = await getPosts();
  console.log(data)
  return (
    <div>
      <PostList data={data} />
    </div>
  );
}
