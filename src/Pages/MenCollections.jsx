import { categoryList } from "@/Api";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenCollections = () => {
  const [menProducts, setMenProducts] = useState([]);
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`${categoryName}`);
  };

  const filterMensCategories = async () => {
    const data = await categoryList();
    const mensCategories = data.filter((category) =>
      category.startsWith("mens-")
    );
    setMenProducts(mensCategories);
    console.log(mensCategories);
    return mensCategories;
  };

  useEffect(() => {
    filterMensCategories();
  }, []);

  return (
    <div>
      <h2 className="border-b font-kumbh font-bold text-xl text-center tracking-wide p-6 m-4 capitalize">
        Mens Category
      </h2>
      <div className="grid grid-cols-1 p-4 gap-12 ">
        {menProducts?.map((product, index) => (
          <div
            onClick={() => handleClick(product)}
            className=" w-2/4 bg-gray-100 py-6 px-4 rounded-lg flex justify-between items-center hover:bg-gray-200"
            key={index}
          >
            <p className="font-kumbh capitalize tracking-wide  ">{product}</p>
            <ChevronRight />
          </div>
        ))}
      </div>
    </div>
  );
};
