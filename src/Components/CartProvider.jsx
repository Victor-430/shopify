import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // initialize cart items from local storage
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Save Cart Items to Local Storage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    if (!product) return;
    setCartItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [];
      // checks if item exists
      const existingItemId = prevItems.findIndex(
        (item) => item.id === product.id
      );
      if (existingItemId > -1) {
        // if item exist, create a new array and update quatity
        const updatedItems = [...prevItems];
        updatedItems[existingItemId] = {
          ...updatedItems[existingItemId],
          quantity: updatedItems[existingItemId].quantity + 1,
        };
        return updatedItems;
      }

      // if item does not exist add new item
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, newQuantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };
  const calculateTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addToCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    total: calculateTotal(),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Use Cart must be within a CartProvider");
  }
  return context;
};
