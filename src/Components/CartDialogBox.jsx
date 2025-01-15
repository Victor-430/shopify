import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "./CartProvider";
import minusIcon from "../Assets/img/icon-minus.svg";
import plusIcon from "../Assets/img/icon-plus.svg";

export const CartDialog = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    cartItems = [],
    total = 0,
  } = useCart();

  const { toast } = useToast();

  if (!cartItems) {
    return null;
  }

  const handleAddToCart = () => {
    toast({
      title: "Cart updated",
      description: "Your items have been added to the cart",
      variant: "success",
      className: "bg-orange-500 hover:bg-orange-200",
    });
    setIsCartOpen(false);
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-center py-4 text-gray-500">Your Cart is Empty</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b pb-4 gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${(item.price || 0).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="hover:text-gray-100 rounded"
                        onClick={() => {
                          updateQuantity(item.id, (item.quantity || 1) - 1);
                        }}
                      >
                        <img src={minusIcon} alt="minusIcon" />
                      </button>
                      <span className="items-center text-center w-8">
                        {item.quantity || 0}
                      </span>
                      <button
                        className=" hover:text-gray-100 rounded"
                        onClick={() =>
                          updateQuantity(item.id, (item.quantity || 0) + 1)
                        }
                      >
                        <img src={plusIcon} alt="plusIcon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <DialogFooter className="flex justify-center items-center mt-4">
            <div className="font-medium text-md ">
              Total: ${(total || 0).toFixed(2)}
            </div>
            <button
              className="bg-black hover:bg-gray-800 px-4 py-2 w-3/4 text-white rounded"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};
