import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { categoryProducts } from "@/Api";
import { FetchError } from "@/Api/FetchError";

import { ProductItems } from "@/Components/ProductItems";
import { LoadingSpinner } from "@/Components/LoadingSpinner";

export const MenCategory = () => {
  const [mensProduct, setMensProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { category } = useParams();

  console.log(category);

  useEffect(() => {
    const fetchMenProduct = async () => {
      try {
        setIsLoading(true);
        const data = await categoryProducts(category);
        if (!data) {
          setError("An Error Occured");
          return;
        }
        setMensProduct(data);
        console.log(data);
      } catch (error) {
        setError(`Failed to load products for ${category}. Please try again.`);
        console.error(`An error occured : ${error}`);
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    fetchMenProduct();
  }, [category]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <div>
      <h1 className="font-kumbh font-bold border-b text-xl text-center tracking-wide capitalize p-8">
        {category}
      </h1>
      <div className="grid grid-cols-3 gap-4 p-8">
        {mensProduct.map((product) => (
          <ProductItems product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
