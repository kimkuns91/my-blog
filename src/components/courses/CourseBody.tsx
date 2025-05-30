import { cn } from '@/utils/style';

interface CourseBodyProps {
  lectureUrl: string;
}
const CourseBody: React.FC<CourseBodyProps> = ({ lectureUrl }) => {
  console.log(lectureUrl)
  return (
    <div className={cn('z-50 flex-1 bg-[#EFF5FB] px-5 pb-20 pt-10')}>
      <div className="size-full bg-pink-500">
        <video controls className="w-full rounded-lg">
          <source src={lectureUrl} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default CourseBody;
