import PostList from '@/components/PostList';
import PostSideBar from '@/components/PostSideBar';

export default function Page() {
  return (
    <div className="container w-full flex py-40">
      <div className='flex-1'>
        <PostSideBar />
      </div>
      <div className='flex-[5]'>
        <PostList />
      </div>
    </div>
  );
}
