import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { categoryProducts } from "@/Api";
import { ProductItems } from "@/Components/ProductItems";

export const Category = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const getProducts = async () => {
      const data = await categoryProducts(category);
      setProducts(data);
    };
    getProducts();
  }, [category]);

  return (
    <div>
      <h2 className="border-b font-kumbh tracking-wide">{category}</h2>
      <div className="grid grid-cols-2 p-4 gap-[15px] sm:grid-cols-4">
        {products?.map((product) => (
          <ProductItems product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
