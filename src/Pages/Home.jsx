import { allproducts, categoryList } from "@/Api";
import { FetchError } from "@/Api/FetchError";
import { LoadingSpinner } from "@/Components/LoadingSpinner";
import { ProductItems } from "@/Components/ProductItems";
import { useState, useEffect } from "react";

export const Home = () => {
  const [isHome] = useState(true);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllProducts = async () => {
    try {
      setIsLoading(true);
      const data = await allproducts();
      console.log(data);
      setProducts(data);

      if (!data) {
        setError("Error fetching product(s)");
        return;
      }

      await categoryList();
    } catch (error) {
      console.error(error);
      setError("Error fetching product");
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (error) {
    return <FetchError error={error} isHome={isHome} />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-[15px]">
          {products?.map((product) => (
            <ProductItems product={product} key={product.id} />
          ))}
        </div>
      )}
    </>
  );
};
