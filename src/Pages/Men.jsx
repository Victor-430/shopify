import { allproducts, categoryList } from "@/Api";
import { ProductItems } from "@/Components/ProductItems";
import { useEffect, useState } from "react";

export const Men = () => {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    const data = await allproducts();
    console.log(data);
    setProducts(data);
    await categoryList();
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="grid grid-cols-4 p-4 gap-[15px]">
      {products?.map((product) => (
        <ProductItems product={product} key={product.id} />
      ))}
    </div>
  );
};
