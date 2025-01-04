import { useState } from "react";
import { useCart } from "./CartProvider";

export const CartCounter = ({ product }) => {
  const [localQuantity, setLocalQuantity] = useState(1);
  const { cartItems, updateQuantity, addToCart } = useCart();

  const handlePlusCount = () => {
    setLocalQuantity((prev) => Math.min(99, prev + 1));
  };

  const handleMinusCount = () => {
    setLocalQuantity((prev) => Math.max(0, prev - 1));
  };

  // const handleCartCounter = () => {
  //   // checks if product alreday existss in cart
  //   const existingItem = cartItems.find((item) => item.id === product.id);

  //   if (existingItem) {
  //     // if item exists, update its quantity
  //     updateQuantity(existingItem.id, localQuantity);
  //   } else {
  //     addToCart({
  //       ...product,
  //       quantity: localQuantity,
  //     });
  //   }
  // };

  return (
    <div className=" font-bold font-kumbh flex items-center justify-between max-sm:w-full w-[150px] h-12 rounded-lg bg-blue-lightGrayish text-lg  px-3">
      <button
        className="flex justify-center  text-orange-500 font-bold text-xl w-8 h-8"
        onClick={handleMinusCount}
      >
        -
      </button>

      <p className="">{localQuantity}</p>

      <button
        className="flex justify-center text-orange-500 w-8 h-8 font-bold text-xl"
        onClick={handlePlusCount}
      >
        +
      </button>
    </div>
  );
};
