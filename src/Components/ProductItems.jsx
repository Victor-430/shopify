import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Heart, HomeIcon } from "lucide-react";
import { AddToCart } from "./AddToCart";

import { useWishlist } from "./WishlistProvider";
import { LazyImage } from "./LazyImage";

export const ProductItems = ({ product }) => {
  const { toogleWishItem, isItemInWishlist } = useWishlist();
  const [error, setError] = useState(null);
  const isLiked = isItemInWishlist(product?.id);
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useNavigate();

  const handleProductClick = async () => {
    try {
      if (!product.id || !product.title || !product.price) {
        setError("Invalid product data");
        return;
      }
      setIsNavigating(true);
      await navigate(`/products/${product?.id}`);
    } catch (error) {
      console.error("Navigation error:", error);
      setError("Failed to view product details");
    } finally {
      setIsNavigating(false);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    if (!product?.id) return;
    toogleWishItem({
      id: product?.id,
      images: product?.images,
      price: product?.price,
      title: product?.title,
    });
  };

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center col-span-2 my-20">
        <div className="text-center tracking-wide font-kumbh">
          <h1 className="text-2xl text-red-500 mb-4 font-semibold">{error}</h1>
          <span className="space-y-4 ">
            <p className="text-gray-400 text-xl ">Please try again</p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors hover:bg-orange-400"
            >
              <HomeIcon className="w-5 h-5" />
              Return Home
            </Link>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className=" w-[1/2] p-4 bg-gray-100 rounded-lg mt-4 transition-all hover:shadow-md hover:shadow-gray-300 md:w-[1/4]">
      <div
        onClick={handleProductClick}
        className={`cursor-pointer ${isNavigating ? "opacity-50" : ""}`}
      >
        <LazyImage
          src={product?.images?.[0]}
          alt={product?.title}
          className="w-full h-[200px] object-cover rounded-md lg:h-[300px]"
        />

        <div className="font-kumbh text-base ">
          <h3 className="font-semibold mb-4 sm:text-xl">{product?.title}</h3>
          <span className="flex align-center justify-between">
            <h3 className="font-semibold mb-4 sm:text-xl line-clamp-2">
              ${product?.price}
            </h3>
            <button
              className="p-2 rounded-full transition-colors hover:bg-gray-200"
              disabled={isNavigating}
            >
              <div
                aria-label={
                  isLiked ? "Remove from wishlist" : "Add to wishlist"
                }
                onClick={handleLikeClick}
              >
                <Heart
                  className="mr-2 h-6 w-6"
                  fill={isLiked ? "red" : "white"}
                  stroke={isLiked ? "red" : "black"}
                />
              </div>
            </button>
          </span>
        </div>
      </div>
      <AddToCart
        id={product?.id}
        image={product?.images?.[0]}
        price={product?.price}
        title={product?.title}
      />
    </div>
  );
};
