import { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { categoryList } from "@/Api";

export const Collections = () => {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`${categoryName}`);
  };

  useEffect(() => {
    const getAllCategory = async () => {
      const data = await categoryList();
      console.log(data);
      setCategory(data);
    };

    getAllCategory();
  }, []);

  return (
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
  );
};
