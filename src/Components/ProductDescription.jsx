import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AddToCart } from "./AddToCart";
import { LightBox } from "./LightBox";

import { singleProduct } from "../Api";
import { LoadingSpinner } from "./LoadingSpinner";
import { FetchError } from "../Api/FetchError";
import { CartCounter } from "./CartCounter";

export const ProductDescription = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async (id) => {
      try {
        setIsLoading(true);
        const data = await singleProduct(id);

        if (!data || !data.title || !data.price || !data.images) {
          setError("Product Not found");
          return;
        }

        setProduct(data);
      } catch (error) {
        console.error(`Error fetching product`, error);
        setError("Error fetching product");
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchProduct(id);
  }, [id]);

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-hidden mx-auto px-0 lg:container sm:px-4 md:px-8 lg:px-12">
          <div className="mx-auto items-start md:grid md:grid-cols-2 md:gap-8 lg:gap-24 lg:max-w-7xl py-0 sm:py-8 md:py-12">
            {product?.images && <LightBox images={product?.images} />}
            <section className="px-6 lg:mt-15 xl:mt-20">
              <div>
                <p className="font-normal font-kumbh text-lg mt-5 mb-3">
                  Sneakers
                </p>
                <h1 className="tracking-widest font-kumbh font-bold w-3/4 text-blue-veryDark mb-5 text-2xl xl:text-3xl lg:mb-10">
                  {product?.title}
                </h1>
                <p className="font-kumbh font-normal text-wrap xl:w-3/4 mb-4 sm:mb-8">
                  {product?.description}
                </p>
              </div>

              <div className="font-kumbh flex justify-between sm:flex-col">
                <div className="flex items-center gap-4">
                  <h3 className="flex font-bold text-2xl">${product?.price}</h3>
                  <span className="flex items-center justify-center bg-blue-veryDark rounded-md text-base text-white px-2">
                    50%
                  </span>
                </div>
                <p className="line-through text-blue-darkGrayish text-md lg:py-2">
                  ${product?.price / 2}
                </p>
              </div>

              <div className="flex flex-col gap-5 mt-5 md:flex-row">
                <CartCounter
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                />
                <AddToCart
                  id={product?.id}
                  images={product?.images}
                  price={product?.price}
                  title={product?.title}
                  quantity={quantity}
                  isProductPage={true}
                />
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
