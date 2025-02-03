import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronRight } from "lucide-react";
import { LoadingSpinner } from "../Components/LoadingSpinner";
import { categoryList } from "../Api";
import { FetchError } from "../Api/FetchError";

export const Collections = () => {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`${categoryName}`);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      try {
        setIsLoading(true);
        const data = await categoryList();

        if (!data) {
          setError("Erorr fetching product(s)");
        }

        setCategory(data);
      } catch (error) {
        console.error(error);
        setError("Error fetching Product");
      } finally {
        setTimeout(() => setIsLoading(false), 2000);
      }
    };

    getAllCategory();
  }, []);

  if (error) {
    return <FetchError error={error} />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="p-7 grid grid-cols-2 gap-5 sm:grid-cols-3">
          {category?.map((item, index) => (
            <div
              onClick={() => handleClick(item)}
              key={index}
              className="bg-gray-100 py-6 px-4 rounded-lg flex justify-between items-center hover:bg-gray-200"
            >
              <p className="font-kumbh capitalize tracking-wide  ">{item}</p>
              <ChevronRight />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
