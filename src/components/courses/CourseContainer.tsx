'use client';

import { Course, Lecture, course, lecture } from '@/libs/dummyData/dummyData';
import { useEffect, useState } from 'react';
import CourseBody from './CourseBody';
import CourseHeader from './CourseHeader';
import CourseSideBar from './CourseSideBar';

interface CourseContainerProps {
  courseId: string;
  lectureNumber: number;
}
const CourseContainer: React.FC<CourseContainerProps> = ({
  courseId,
  lectureNumber,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course | undefined>(
    undefined
  );
  const [currentLecture, setCurrentLecture] = useState<Lecture | undefined>(
    undefined
  );

  useEffect(() => {
    // Parse courseId to number for comparison
    const numericCourseId = parseInt(courseId, 10);

    // Find the course that matches the courseId
    const foundCourse = course.find((c) => c.id === numericCourseId);
    setCurrentCourse(foundCourse);

    // Assuming the lecture data is not nested, adjust if it's different
    const foundLectures = lecture
      .flat()
      .filter((l) => l.courseId === numericCourseId);

    // Find the specific lecture by lectureNumber
    const foundLecture = foundLectures.find(
      (l) => l.lectureNumber === lectureNumber
    );
    setCurrentLecture(foundLecture);
  }, [courseId, lectureNumber]);

  if (!currentCourse || !currentLecture) {
    return <div>Loading...</div>; // Or any other loading state
  }

  return (
    <div className="left-0 top-0 z-50 h-screen w-full overflow-hidden bg-black">
      <CourseHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="flex h-full">
        <CourseSideBar isOpen={isOpen} setIsOpen={setIsOpen} />
        <CourseBody lectureUrl={currentLecture.videoURL} />
      </div>
    </div>
  );
};
export default CourseContainer;
