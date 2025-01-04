// export const LightBox = ({
//   product1,
//   product1_thumbNail,
//   product2_thumbNail,
//   product3_thumbNail,
//   product4_thumbNail,
// }) => {
//   return (
//     <div className="grid max-w-5xl">
//       <main className="">
//         <div className="max-w-[350px]">
//           <img
//             className="w-[350px] h-[350px] rounded-2xl"
//             src={product1}
//             alt="product1"
//           />
//           <div className=" flex gap-5 my-8">
//             <img
//               style={{ width: "72px", height: "72px", borderRadius: "10px" }}
//               src={product1_thumbNail}
//               alt="product1thumbnail"
//             />
//             <img
//               style={{ width: "72px", height: "72px", borderRadius: "10px" }}
//               src={product2_thumbNail}
//               alt="product2thumbnail"
//             />
//             <img
//               style={{ width: "72px", height: "72px", borderRadius: "10px" }}
//               src={product3_thumbNail}
//               alt="product3thumbNail"
//             />
//             <img
//               style={{ width: "72px", height: "72px", borderRadius: "10px" }}
//               src={product4_thumbNail}
//               alt="product4thumbNail"
//             />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

import { useState } from "react";
import CloseOverlay from "../Assets/img/icon-close.svg";
import NextBtn from "../Assets/img/icon-next.svg";
import PrevBtn from "../Assets/img/icon-previous.svg";

export const LightBox = ({
  product1,
  product2,
  product3,
  product4,
  product1_thumbNail,
  product2_thumbNail,
  product3_thumbNail,
  product4_thumbNail,
}) => {
  const [selectedImage, setSelectedImage] = useState(product1);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const thumbnails = [
    { src: product1_thumbNail, alt: "product1thumbnail", main: product1 },
    { src: product2_thumbNail, alt: "product2thumbnail", main: product2 },
    { src: product3_thumbNail, alt: "product3thumbnail", main: product3 },
    { src: product4_thumbNail, alt: "product4thumbnail", main: product4 },
  ];

  const navigateImage = (direction) => {
    let newIndex = selectedThumb;
    if (direction === "next") {
      newIndex = (selectedThumb + 1) % thumbnails.length;
    } else {
      newIndex =
        selectedThumb === 0 ? thumbnails.length - 1 : selectedThumb - 1;
    }
    setSelectedImage(thumbnails[newIndex].main);
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
            className="sm:aspect-square aspect-[5/4] rounded-none w-full object-cover sm:rounded-2xl"
            src={selectedImage}
            alt="Selected product"
          />
        </div>
        {/* Mobile Navigation Buttons */}
        <div className="sm:hidden absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4">
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
      <div className="grid grid-cols-4 gap-4 max-sm:hidden  sm:mt-8">
        {thumbnails.map((thumb, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedImage(thumb.main);
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
              src={thumb.src}
              alt={thumb.alt}
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
          className="max-sm:hidden fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
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
              className="max-h-[80vh]  w-full rounded-lg object-contain"
            />

            {/* Navigation Buttons */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("prev");
              }}
              className=" absolute -left-3 text-white/75 hover:text-white p-2 rounded-full bg-white hover:bg-orange-400"
            >
              <img src={PrevBtn} alt="previous" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateImage("next");
              }}
              className="absolute -right-3 text-white/75 hover:text-white p-2 rounded-full bg-white hover:bg-orange-400"
            >
              <img src={NextBtn} alt="previous" sizes={24} />
            </button>
          </div>

          {/* Thumbnails at Bottom */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-4">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(thumb.main);
                  setSelectedThumb(index);
                }}
                className={`w-20 h-20 rounded-lg overflow-hidden ${
                  selectedThumb === index
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-100"
                }`}
              >
                <img
                  className="w-full h-full object-cover"
                  src={thumb.src}
                  alt={thumb.alt}
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
