import {
  useState,
  useContext,
  createContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const CartContext = createContext();

const getInititateCart = () => {
  try {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInititateCart);
  const [currentItem, setCurrentItem] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Save Cart Items to Local Storage
  useEffect(() => {
    const timeoutId = setInterval(() => {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, 300);

    return () => clearInterval(timeoutId);
  }, [cartItems]);

  const addToCart = useCallback(async (product, quantity = 1) => {
    if (!product) return;

    setIsLoading(true);
    setIsCartOpen(true);
    setCurrentItem(product);

    try {
      await new Promise((res) => setTimeout(res, 100));
      setCartItems((prevItems) => {
        if (!Array.isArray(prevItems)) return [{ ...product, quantity }];
        // checks if item exists
        const existingItemId = prevItems.find((item) => item.id === product.id);
        if (existingItemId) {
          // if item exist, create a new array and update quantity
          return prevItems.map((item) =>
            product.id === item.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          //   const updatedItems = [...prevItems];
          //   updatedItems[existingItemId] = {
          //     ...updatedItems[existingItemId],
          //     quantity: updatedItems[existingItemId].quantity + 1,
          //   };
          //   return updatedItems;
        }

        // if item does not exist add new item
        return [...prevItems, { ...product, quantity }];
      });
    } catch (error) {
      console.error(`Error adding to cart:`, error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = useCallback(async (productId) => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 100));
      setCartItems((prevItems) => {
        return prevItems.filter((item) => item.id !== productId);
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearCart = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 100));
      setCartItems([]);
      localStorage.removeItem("cartItems");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDialogClose = useCallback(() => {
    setIsCartOpen(false);
    setCurrentItem(null); // Clear current item
  }, []);

  const updateQuantity = useCallback(
    async (productId, newQuantity) => {
      if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
      }
      setIsLoading(true);
      try {
        await new Promise((res) => setTimeout(res, 100));

        setCartItems((prevItems) => {
          return prevItems
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: Math.max(0, newQuantity) }
                : item
            )
            .filter((item) => item.quantity > 0);
        });
      } finally {
        setIsLoading(false);
      }
    },
    [removeFromCart]
  );

  const total = useMemo(() => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((sum, item) => {
      const itemPrice = Number(item.price) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      return sum + itemPrice * itemQuantity;
    }, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      isLoading,
      isCartOpen,
      setIsCartOpen,
      currentItem,
      setCurrentItem,
      addToCart,
      cartItems,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      handleDialogClose,
    }),
    [
      isLoading,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      currentItem,
      cartItems,
      removeFromCart,
      updateQuantity,
      clearCart,
      total,
      handleDialogClose,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("Use Cart must be within a CartProvider");
  }
  return context;
};
