import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Heart, HomeIcon } from "lucide-react";
import { AddToCart } from "./AddToCart";

import { useWishlist } from "./WishlistProvider";

export const ProductItems = ({ product }) => {
  const { toogleWishItem, isItemInWishlist } = useWishlist();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLiked = isItemInWishlist(product?.id);

  const navigate = useNavigate();

  const handleProductClick = () => {
    try {
      setLoading(true);
      if (!product || !product.title || !product.price) {
        setError("Error Fetching Product");
        return;
      }
      navigate(`/products/${product?.id}`);
    } catch (error) {
      console.error(`Error fetching product`, error);
      setError("Error fetching product");
    } finally {
      setTimeout(() => setLoading(!loading), 2000);
    }
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
              className="inline-flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-400 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Return Home
            </Link>
          </span>
        </div>
      </div>
    );
  }

  const handleLikeClick = (e) => {
    e.stopPropagation();
    toogleWishItem({
      id: product?.id,
      images: product?.images,
      price: product?.price,
      title: product?.title,
    });
  };

  return (
    <div className=" w-[1/2] p-4 bg-gray-100 rounded-lg mt-4 hover:shadow-md hover:shadow-gray-300 md:w-[1/4]">
      <div onClick={handleProductClick}>
        <img
          className="w-[400px] h-[200px] lg:h-[300px]"
          src={product?.images[0]}
        />

        <div className="font-kumbh text-base ">
          <h3 className="font-semibold mb-4 sm:text-xl">{product?.title}</h3>
          <span className="flex align-center justify-between">
            <p className="flex font-medium mb-2 sm:text-lg">
              ${product?.price}
            </p>
            <button>
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
        image={product?.images[0]}
        price={product?.price}
        title={product?.title}
      />
    </div>
  );
};
