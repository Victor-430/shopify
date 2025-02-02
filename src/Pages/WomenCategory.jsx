import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { categoryProducts } from "@/Api";
import { FetchError } from "@/Api/FetchError";

import { ProductItems } from "@/Components/ProductItems";
import { LoadingSpinner } from "@/Components/LoadingSpinner";

export const WomenCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [womenProducts, setWomenProducts] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    try {
      const fetchWomenProduct = async () => {
        setIsLoading(true);
        const data = await categoryProducts(category);

        if (!data) {
          setError("Error fetching product(s)");
          return;
        }
        setWomenProducts(data);
        console.log(data);
      };

      fetchWomenProduct();
    } catch (error) {
      console.error(error);
      setError("error fetching error");
    }
  }, [category]);

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <div>
      <h1 className="font-kumbh font-bold border-b text-xl text-center tracking-wide capitalize p-8">
        {category}
      </h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 gap-4 p-8 lg:grid-cols-3">
          {womenProducts.map((product) => (
            <ProductItems product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};
