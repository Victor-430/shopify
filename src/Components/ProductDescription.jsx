import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { AddToCart } from "./AddToCart";
import { CartCounter } from "./CartCounter";
import { LightBox } from "./LightBox";
import { Toaster } from "./ui/toaster";

import { singleProduct } from "@/Api";
import { LoadingSpinner } from "./LoadingSpinner";

export const ProductDescription = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async (id) => {
      const data = await singleProduct(id);
      if (!data) <Navigate to="*" replace />;
      setProduct(data);
      setTimeout(() => setLoading(false), 2000);
    };
    fetchProduct(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-hidden lg:container mx-auto  px-0 sm:px-4 md:px-8 lg:px-12">
          <Toaster />
          <div className="md:grid md:grid-cols-2 md:gap-8  lg:gap-24 lg:max-w-7xl mx-auto items-start py-0 sm:py-8 md:py-12">
            {product?.images && <LightBox images={product?.images} />}
            <section className="px-6 lg:mt-15 xl:mt-20">
              <div>
                <p className="font-normal font-kumbh text-lg mt-5 mb-3">
                  Sneakers
                </p>
                <h1 className="tracking-widest font-kumbh font-bold text-2xl xl:text-3xl w-3/4 text-blue-veryDark mb-5 lg:mb-10">
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

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <CartCounter />
                <AddToCart />
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
};
