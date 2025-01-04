import { endpoints } from "./endpoints";

const BaseUrl = "https://dummyjson.com";

export const allproducts = async () => {
  try {
    const data = await fetch(`${BaseUrl}${endpoints.allproducts}`);
    const res = await data.json();
    return res?.products;
  } catch (error) {
    console.error(error);
  }
};

export const categoryList = async () => {
  try {
    const data = await fetch(`${BaseUrl}${endpoints.categories}`);
    const res = await data.json();
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};

// export const mensCategory = async () => {
//   try {
//     const data = await fetch(
//       `${BaseUrl}${endpoints.allproducts}${endpoints.category.mensCategory}`
//     );
//     // const res = await data.json();
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
// };
