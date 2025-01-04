import { useState } from "react";
import cartIcon from "../Assets/img/icon-cart.svg";
import { Heart } from "lucide-react";

export const ProductItems = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className=" w-[2/2] sm:w-[1/4] p-4 bg-gray-100 rounded-lg mt-4 hover:shadow-md hover:shadow-gray-300">
      <img className="w-[400px] h-[300px]" src={product?.images[0]} />

      <div className="">
        <h3 className="text-xl font-semibold mb-4">{product?.title}</h3>
        <span className="flex align-center justify-between">
          <p className="flex font-medium text-lg mb-2">${product?.price}</p>
          <Heart
            onClick={() => setIsLiked(!isLiked)}
            className="mr-2 h-6 w-6"
            fill={isLiked ? "red" : "white"}
            stroke={isLiked ? "red" : "black"}
          />
        </span>
        <button className="w-full flex justify-center items-center bg-black hover:bg-gray-700 transition-colors rounded-lg h-12 ">
          <img
            className="flex items-center w-4 h-4 text-white"
            src={cartIcon}
            alt="addToCart"
          />
          <h4 className="font-bold text-base sm:text-sm px-2 text-white ">
            Add To cart
          </h4>
        </button>
      </div>
    </div>
  );
};
