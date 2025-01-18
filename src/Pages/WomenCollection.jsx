import { categoryList } from "@/Api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WomenCollection = () => {
  const [womenCategory, setWomenCategory] = useState([]);
  const navigate = useNavigate();

  const handleClick = (categoryName) => {
    navigate(`${categoryName}`);
  };

  useEffect(() => {
    const filterWomenCategories = async () => {
      const data = await categoryList();
      const filterCategory = data.filter((category) =>
        category.startsWith("womens-")
      );
      setWomenCategory(filterCategory);
      console.log(filterCategory);
    };
    filterWomenCategories();
  }, []);

  return (
    <div>
      {womenCategory.map((category, index) => (
        <div onClick={() => handleClick(category)} key={index}>
          {category}
        </div>
      ))}
    </div>
  );
};
