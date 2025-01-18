import { categoryProducts } from "@/Api";
import { ProductItems } from "@/Components/ProductItems";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WomenCategory = () => {
  const { category } = useParams();
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchWomenProduct = async () => {
      const data = await categoryProducts(category);
      setWomenProducts(data);
      console.log(data);
    };
    fetchWomenProduct();
  }, [category]);

  return (
    <div>
      <h1>{category}</h1>
      {womenProducts.map((product) => (
        <ProductItems product={product} key={product.id} />
      ))}
    </div>
  );
};
