'use client';

import { useEffect, useState } from 'react';

const BigBang = () => {
  const [show, setShow] = useState(false);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const hasWatched = sessionStorage.getItem('hasWatchedOpening');

    if (!hasWatched) {
      setShow(true); 
      setTimeout(() => {
        setOpacity(0);
      }, 6000);
    }
  }, []);

  useEffect(() => {
    if (opacity === 0) {
      setTimeout(() => {
        setShow(false);
        sessionStorage.setItem('hasWatchedOpening', 'true');
      }, 1000); 
    }
  }, [opacity]);

  if (!show) {
    return null;
  }

  return (
    <div
      className="absolute left-0 top-0 z-[999] h-screen w-full transition-opacity duration-1000"
      style={{ opacity }}
    >
      <video
        src={'/videos/bigbang.mp4'}
        className="size-full object-cover"
        autoPlay
        loop
        muted
      />
    </div>
  );
};

export default BigBang;
