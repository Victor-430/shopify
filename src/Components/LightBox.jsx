import { useState } from "react";
import CloseOverlay from "../Assets/img/icon-close.svg";
import NextBtn from "../Assets/img/icon-next.svg";
import PrevBtn from "../Assets/img/icon-previous.svg";

export const LightBox = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const navigateImage = (direction) => {
    let newIndex = selectedThumb;
    if (direction === "next") {
      newIndex = (selectedThumb + 1) % images?.length;
    } else {
      newIndex = selectedThumb === 0 ? images?.length - 1 : selectedThumb - 1;
    }
    setSelectedImage(images[newIndex]);
    setSelectedThumb(newIndex);
  };

  return (
    <div className="w-full max-w-[34.4rem] mx-auto">
      <div className=" w-full relative">
        {/* Main Card */}
        <div
          className="  w-full relative cursor-auto sm:cursor-zoom-in"
          onClick={() => setIsZoomed(true)}
        >
          <img
            className="aspect-[5/4] rounded-none w-full object-cover sm:aspect-square sm:rounded-2xl"
            src={selectedImage}
            alt="Selected product"
          />
        </div>
        {/* Mobile Navigation Buttons */}
        <div className="top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:hidden absolute">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("prev");
            }}
            className="bg-white p-2 rounded-full"
          >
            <img src={PrevBtn} alt="previous" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateImage("next");
            }}
            className="bg-white p-2 rounded-full"
          >
            <img src={NextBtn} alt="next" />
          </button>
        </div>
      </div>
      {/* Thumbnails Container */}
      <div className="grid-cols-4 gap-4 hidden sm:grid sm:mt-8">
        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(img);
              setSelectedThumb(index);
            }}
            className={`relative aspect-square rounded-xl overflow-hidden
              ${
                selectedThumb === index
                  ? "ring-2 ring-orange-500"
                  : "hover:opacity-75"
              }
            `}
          >
            <img
              className="w-full h-full object-cover"
              src={img}
              // alt={thumb.alt}
            />
            {selectedThumb === index && (
              <div className="absolute inset-0 bg-white/40" />
            )}
          </button>
        ))}
      </div>
      {/* Zoom Overlay */}
      {isZoomed && (
        <div
          className="hidden fixed inset-0 bg-black/80 z-50 items-center justify-center sm:flex"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute -top-10 -right-2 "
          >
            <img
              className="text-orange-700 p-2  hover:text-orange-200"
              src={CloseOverlay}
              alt="close"
            />
          </button>

          {/* Main Image Container */}
          <div className="relative -top-12 h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Zoomed product"
              className="max-h-[80vh] w-full rounded-lg object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className=" absolute -left-3 text-white/75 p-2 rounded-full bg-whitehover:text-white hover:bg-orange-400"
            >
              <img src={PrevBtn} alt="previous" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute -right-3 text-white/75 p-2 rounded-full bg-white hover:text-white hover:bg-orange-400"
            >
              <img src={NextBtn} alt="previous" sizes={24} />
            </button>
          </div>

          {/* Thumbnails at Bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4">
            {images?.map((img, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(img);
                  setSelectedThumb(index);
                }}
                className={`w-20 h-20 rounded-lg overflow-hidden ${
                  selectedThumb === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img className="w-full h-full object-cover" src={img} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
