import cartIcon from "../Assets/img/icon-cart.svg";
import { useCart } from "./CartProvider";

export const AddToCart = ({ image, title, price, id }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    console.log({ title });
    addToCart({
      id: id,
      image: image,
      title: title,
      price: price,
    });
  };

  return (
    <div className="mb-5">
      <button
        className="w-full flex justify-center items-center bg-black hover:bg-gray-700 transition-colors rounded-lg md:max-lg:w-[12rem] sm:w-[15.625rem] h-12 "
        onClick={handleAddToCart}
      >
        <img
          className="flex items-center w-4 h-4 text-white"
          src={cartIcon}
          alt="addToCart"
        />
        <h4 className="font-bold font-kumbh text-base px-2 text-white sm:text-sm">
          Add To cart
        </h4>
      </button>
    </div>
  );
};
