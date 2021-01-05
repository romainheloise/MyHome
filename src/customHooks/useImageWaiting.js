import { useEffect, useState } from "react";

const useImageWaiting = (ref) => {
  const [imageLoad, setImageLoading] = useState(false);

  const imageLoader = (e) => {
    if (e.target && e.target.complete) {
      setImageLoading(true);
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("load", imageLoader);
    }
  }, [ref]);

  return imageLoad;
};

export default useImageWaiting;
