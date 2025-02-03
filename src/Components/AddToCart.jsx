import { toast } from "../hooks/use-toast";
import cartIcon from "../Assets/img/icon-cart.svg";
import { useCart } from "./CartProvider";

export const AddToCart = ({
  image,
  title,
  price,
  id,
  isProductPage,
  quantity,
}) => {
  const { setIsCartOpen, setCurrentItem, addToCart } = useCart();

  const handleAddToCart = () => {
    if (!id || !title || !price) {
      toast({
        title: "Error",
        description: "Unable to add item to cart",
        variant: "destructive",
        className: "bg-red text-white font-kumbh",
      });
      return;
    }

    const productData = { id: id, image: image, title: title, price: price };

    if (isProductPage) {
      if (quantity <= 0) {
        toast({
          title: "Invalid quantity",
          description: "Please select at least one item",
          variant: "destructive",
          className: "bg-red-500 text-white font-kumbh",
        });
        return;
      }

      addToCart(productData, quantity);
      setIsCartOpen(false);

      toast({
        title: "Success",
        description: `Added ${quantity} item(s) to cart`,
        variant: "success",
        className: "bg-black text-white font-kumbh",
      });
    } else {
      setCurrentItem(productData);

      setIsCartOpen(true);
    }
  };

  return (
    <div className="mb-5">
      <button
        className="w-full flex justify-center space-x-2 items-center bg-black transition-colors h-12 rounded-lg hover:bg-gray-700 md:max-lg:w-[12rem] sm:w-[15.625rem]"
        onClick={handleAddToCart}
      >
        <img
          className="flex items-center w-4 h-4"
          src={cartIcon}
          alt="addToCart"
        />
        <h4 className="font-bold font-kumbh px-2 text-white text-sm md:text-base">
          Add To cart
        </h4>
      </button>
    </div>
  );
};
