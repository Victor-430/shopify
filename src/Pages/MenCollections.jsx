import { categoryList } from "@/Api";
import { FetchError } from "@/Api/FetchError";
import { LoadingSpinner } from "@/Components/LoadingSpinner";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MenCollections = () => {
  const [menProducts, setMenProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`${categoryName}`);
  };

  const filterMensCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryList();

      if (!data) {
        setError("Error fetching product(s)");
        return;
      }
      const mensCategories = data.filter((category) =>
        category.startsWith("mens-")
      );

      setMenProducts(mensCategories);

      console.log(mensCategories);
      return mensCategories;
    } catch (error) {
      console.error(error);
      setError("Error fetching product");
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
    s;
  };

  useEffect(() => {
    filterMensCategories();
  }, []);

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <div>
      <h2 className="border-b font-kumbh font-bold text-xl text-center tracking-wide p-6 m-4 capitalize">
        Mens Category
      </h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 p-4 gap-12 ">
          {menProducts?.map((product, index) => (
            <div
              onClick={() => handleClick(product)}
              className=" w-2/4 bg-gray-100 py-6 px-4 rounded-lg flex justify-between items-center hover:bg-gray-200"
              key={index}
            >
              <p className="font-kumbh capitalize tracking-wide">{product}</p>
              <ChevronRight />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
