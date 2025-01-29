import { ProductItems } from "./ProductItems";
import { useWishlist } from "./WishlistProvider";

export const WishListItems = () => {
  const { wishItems = [], removeWishItem } = useWishlist();

  const handleRemove = (productId) => {
    removeWishItem(productId);
  };

  if (wishItems.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        Your Wishlist is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      <h4 className="text-2xl text-center capitalize tracking-wide font-bold border-b p-6 mb-6">
        wishlist ({wishItems.length})
      </h4>
      <div className="overflow-x-hidden grid grid-cols-1 mr-6 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {wishItems.map((wishItem) => (
          <ProductItems
            key={wishItem.id}
            product={wishItem}
            onRemove={() => handleRemove(wishItem.id)}
          />
        ))}
      </div>
    </div>
  );
};
