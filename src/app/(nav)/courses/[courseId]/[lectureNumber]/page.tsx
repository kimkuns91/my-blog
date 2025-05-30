import CourseContainer from '@/components/courses/CourseContainer';

type CourseProps = {
  params: {
    courseId: string;
    lectureNumber: number;
  };
};

// export const generateMetadata = async ({
//   params,
// }: PostProps): Promise<Metadata> => {
//   const postId = params.postId;
//   const post = await getPost(postId);

//   return {
//     title: post?.title,
//     description: post?.content?.split('.')[0],
//     openGraph: post?.previewImageUrl
//       ? {
//           images: [
//             {
//               url: post.previewImageUrl,
//             },
//           ],
//         }
//       : undefined,
//   };
// };

export default async function PostPage({ params }: CourseProps) {
  const courseId = 
  console.log('courseId :', params.courseId);
  console.log('lectureNumber :', params.lectureNumber);

  return <CourseContainer courseId={params.courseId} lectureNumber={params.lectureNumber} />;
}
