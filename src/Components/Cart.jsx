import { useState } from "react";
import deleteIcon from "../Assets/img/icon-delete.svg";
import { Badge } from "./ui/badge";
import { useCart } from "./CartProvider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
// import { useCloseMenu } from "./utils/HandleOutsideClick";

export const Cart = ({ img }) => {
  const { cartItems = [], removeFromCart, total, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // const menuRef = useRef(null);
  // const { isMenuOpen, registerMenu, toggleMenu, activeMenuRef } =
  //   useCloseMenu();

  // const menuId = "cart-menu";
  // const isOpen = isMenuOpen && activeMenuRef.current === menuId;

  // useEffect(() => {
  //   const handleOutsideClick = (e) => {
  //     if (
  //       menuRef.current &&
  //       !menuRef.current.contains(e.target) &&
  //       e.target !== menuRef.current
  //     ) {
  //       toggleMenu(null);
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleOutsideClick);
  //     const unregister = registerMenu(menuRef);
  //     return () => {
  //       document.removeEventListener("mousedown", handleOutsideClick);
  //       unregister();
  //     };
  //   }
  // }, [isOpen, registerMenu, toggleMenu]);

  // const handleOpenCart = (e) => {
  //   e.stopPropagation();
  //   toggleMenu(menuId);
  // };

  const handleCheckout = async () => {
    if (cartItems.length <= 0) {
      toast({
        title: "Your Cart is Empty",
        description: "Please Add Items to your Cart before Checkout",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
      navigate("/payment", { state: { cartTotal: total } });
      clearCart();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to proceed to checkout. Please try again",
        variant: "destructive",
      });
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const itemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  return (
    <div>
      <Button
        variant="ghost"
        className="relative p-2 hover:bg-gray-100  text-gray-500 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <img src={img} alt="cart" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex item-center justify-center p-0 text-xs rounded-full "
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="mt-2 p-2 sm:mt-10 w-full sm:w-[3/4] md:w-[26.5rem] right-0 absolute bg-transparent  ">
          <div className="bg-white rounded-lg shadow-lg z-50 border border-gray">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Cart</h2>
            </div>

            <div className=" sm:max-h-[60vh] overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p className=" text-center py-4 font-kumbh font-normal text-blue-darkGrayish">
                  Your Cart is Empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center border-b pb-4 gap-4"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded-lg"
                        src={item.image}
                        alt={item.name}
                      />

                      <div className="flex-1">
                        <div className="text-left">
                          <h3 className="font-medium">{item.name}</h3>
                        </div>
                        <div className="flex item-center justify-between">
                          <p className="text-sm text-gray-500">
                            ${(item.price || 0).toFixed(2)} x {item.quantity}
                          </p>
                          <h5 className="font-bold text-md">
                            $
                            {((item.price || 0) * (item.quantity || 0)).toFixed(
                              2
                            )}
                          </h5>
                          <div
                            className="cursor-pointer ml-2 p-1 text-orange-600 hover:text-gray-100 rounded"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <img
                              className="text-right"
                              src={deleteIcon}
                              alt="deleteIcon"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              className="transition-colors font-kumbh bg-orange-500 hover:bg-orange-400 font-bold mb-4 mx-5 text-md rounded-lg  w-[90%]"
              onClick={handleCheckout}
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner loading={isLoading} /> : "Checkout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
