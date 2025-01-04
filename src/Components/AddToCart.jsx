import cartIcon from "../Assets/img/icon-cart.svg";
import { useCart } from "./CartProvider";
import { CartDialog } from "./CartDialogBox";
import product1 from "../Assets/img/image-product-1.jpg";

export const AddToCart = () => {
  const { addToCart } = useCart();

  return (
    <div className="mb-5">
      <button
        className="w-full flex justify-center items-center bg-orange-500 hover:bg-orange-200 transition-colors rounded-lg md:max-lg:w-[12rem] sm:w-[15.625rem] h-12 "
        onClick={() =>
          addToCart({
            id: "1",
            name: "Limited Edition Sneaker",
            price: 199.99,
            description:
              "Premium quality sneaker with durable rubber outer sole",
            image: product1,
          })
        }
      >
        <img
          className="flex items-center w-4 h-4"
          src={cartIcon}
          alt="addToCart"
        />
        <h4 className="font-bold font-kumbh text-base sm:text-sm px-2 ">
          Add To cart
        </h4>
      </button>

      <CartDialog />
    </div>
  );
};
