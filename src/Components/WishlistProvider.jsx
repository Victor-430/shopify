import { useEffect, useState } from "react";
import { createContext, useContext } from "react";

const WishlistContext = createContext();

const saveToLocalStorage = (savedWishItem) => {
  localStorage.setItem("wishlist", JSON.stringify(savedWishItem));
};

const loadFromLocalStorage = () => {
  try {
    const savedWishItem = localStorage.getItem("wishlist");
    return savedWishItem ? JSON.parse(savedWishItem) : [];
  } catch (error) {
    `Error loading wishlis from localstoraget:`, error;
    return [];
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishItems, setWishItems] = useState(loadFromLocalStorage);

  useEffect(() => {
    saveToLocalStorage(wishItems);
  }, [wishItems]);

  const addWishItem = async (product) => {
    try {
      await new Promise((res) => setTimeout(res, 100));
      setWishItems((prevItem) => {
        // check for existing item
        const existingWishItemId = prevItem.some(
          (item) => item.id === product.id
        );

        // if item dosen't exist, add new wishlist
        if (!existingWishItemId) {
          return [...prevItem, { ...product }];
        }
        return prevItem;
      });
    } catch (error) {
      console.error(`Error adding item to wishlist:`, error);
    }
  };

  const removeWishItem = (productId) => {
    setWishItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const toogleWishItem = async (product) => {
    await new Promise((res) => setTimeout(res, 100));
    const existingWishItem = wishItems.some((item) => item.id === product.id);
    if (existingWishItem) {
      removeWishItem(product.id);
    } else {
      await addWishItem(product);
    }
  };

  const isItemInWishlist = (productId) => {
    return wishItems.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        addWishItem,
        wishItems,
        isItemInWishlist,
        removeWishItem,
        toogleWishItem,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
