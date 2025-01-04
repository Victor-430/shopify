import { CartCounter } from "./CartCounter";
import { AddToCart } from "./AddToCart";
import { Price } from "./Price";
import { ProductDescription } from "./ProductDescription";

export const Hero = () => {
  return (
    <div className="px-6">
      <ProductDescription />
      <Price />
      <div className="flex flex-col sm:flex-row gap-3 mt-5">
        <CartCounter />
        <AddToCart />
      </div>
    </div>
  );
};
