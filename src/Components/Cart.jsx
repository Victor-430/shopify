import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import deleteIcon from "../Assets/img/icon-delete.svg";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import { useCart } from "./CartProvider";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "./LoadingSpinner";

export const Cart = ({ img }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef(null);
  const { cartItems = [], removeFromCart, total, clearCart } = useCart();

  const { toast } = useToast();
  const navigate = useNavigate();

  console.log(cartItems);

  const handleCartNavigation = async (productId) => {
    try {
      setIsLoading(true);
      navigate(`/products/${productId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

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
    <div className="">
      <Button
        variant="ghost"
        className="relative p-2 hover:bg-gray-100   rounded-full"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <img src={img} alt="cart" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex item-center justify-center p-0 text-xs text-white rounded-full bg-black75 "
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className=" mt-6 p-2 sm:mt-10 w-full sm:w-[3/4] md:w-[26.5rem] right-0 absolute bg-transparent  ">
          <div
            ref={menuRef}
            className="bg-white rounded-lg shadow-lg z-50 border border-gray"
          >
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-bold text-lg">Cart</h2>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <p className=" text-center py-4 font-kumbh font-normal text-blue-darkGrayish">
                  Your Cart is Empty
                </p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      onClick={() => handleCartNavigation(item.id)}
                      key={item.id}
                      className="flex items-center border-b pb-4 gap-4 hover:bg-gray-200"
                    >
                      <img
                        className="w-20 h-20 object-cover rounded-lg"
                        src={item?.image}
                        alt={item?.name}
                      />

                      <div className="flex-1">
                        <div className="text-left">
                          <h3 className="font-medium">{item?.title}</h3>
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
