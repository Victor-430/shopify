import { useEffect, useState, useRef } from "react";

export const LazyImage = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            imageRef.current.src = src;
            observer.unobserve(imageRef.current);
          }
        });
      },
      { rootMargin: "50px" }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src]);

  return (
    <div className="relative">
      {!imageLoaded && (
        <div className="w-full h-[200px] lg:h-[300px] bg-gray-200 rounded-md animate-pulse absolute top-0 left-0" />
      )}
      {error && (
        <div className="w-full h-[200px] lg:h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
      <img
        ref={imageRef}
        className={`${className} transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        onError={() => {
          setError(true);
          setImageLoaded(true);
        }}
        loading="lazy"
      />
    </div>
  );
};
