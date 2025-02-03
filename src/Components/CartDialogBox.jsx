import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "./ui/dialog";
import { useToast } from "../hooks/use-toast";
import { useCart } from "./CartProvider";
import minusIcon from "../Assets/img/icon-minus.svg";
import plusIcon from "../Assets/img/icon-plus.svg";
import { useEffect, useState } from "react";

export const CartDialog = () => {
  const [quantity, setQuantity] = useState(1);

  const { isCartOpen, currentItem, addToCart, handleDialogClose } = useCart();

  const { toast } = useToast();

  useEffect(() => {
    if (currentItem) {
      setQuantity(1);
    }
  }, [currentItem]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!currentItem) {
      toast({
        title: "No item selected",
        description: "Please select an items to add to cart",
        variant: "destructive",
        className: "bg-red-500 text-white font-kumbh",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart(currentItem);
    }

    toast({
      title: "Cart updated",
      description: "Your items have been added to the cart",
      variant: "success",
      className: "bg-black text-white font-kumbh hover:bg-black/50",
    });

    handleDialogClose();
  };

  return (
    <Dialog open={isCartOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="bg-white sm:max-w-[425px">
        <DialogHeader>
          <DialogTitle>Shopping Cart</DialogTitle>
          <DialogDescription>
            Review and manage your selected items
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          {!currentItem ? (
            <p className="text-center py-4 text-gray-500">No item selected</p>
          ) : (
            <div className="space-y-4">
              <div
                key={currentItem.id}
                className="flex items-center border-b pb-4 gap-4"
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-medium">{currentItem?.title}</h3>
                  <p className="text-sm text-gray-500">
                    ${(currentItem.price || 0).toFixed(2)}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      className="hover:text-gray-100 rounded"
                      onClick={() => {
                        handleQuantityChange(-1);
                      }}
                    >
                      <img src={minusIcon} alt="minusIcon" />
                    </button>
                    <span className="items-center text-center w-8">
                      {quantity}
                    </span>
                    <button
                      className="rounded hover:text-gray-100"
                      onClick={() => handleQuantityChange(1)}
                    >
                      <img src={plusIcon} alt="plusIcon" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex justify-center items-center mt-4">
            <div className="font-medium text-md ">
              Total: ${((currentItem?.price || 0) * quantity).toFixed(2)}
            </div>
            <button
              className="bg-black hover:bg-gray-700 px-4 py-2 w-3/4 text-white rounded"
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
