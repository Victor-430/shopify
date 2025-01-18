import { categoryProducts } from "@/Api";
import { ProductItems } from "@/Components/ProductItems";
import { LoadingSpinner } from "@/Components/LoadingSpinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MenCategory = () => {
  const [mensProduct, setMensProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { category } = useParams();

  console.log(category);

  useEffect(() => {
    setIsLoading(true);

    try {
      const fetchMenProduct = async () => {
        const data = await categoryProducts(category);
        setMensProduct(data);
        setError(null);
        console.log(data);
      };

      fetchMenProduct();
    } catch (error) {
      setError(`Failed to load products for ${category}. Please try again.`);
      console.error(`An error occured : ${error}`);
    } finally {
      setIsLoading(false);
    }
  }, [category]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="font-kumbh font-normal text-lg text-center tetx-red-500 p-8">
        {error}
      </div>
    );
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
