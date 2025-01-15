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

export const singleProduct = async (id) => {
  try {
    const data = await fetch(`${BaseUrl}${endpoints.allproducts}/${id}`);
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const categoryList = async () => {
  try {
    const data = await fetch(`${BaseUrl}${endpoints.categories}`);
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const categoryProducts = async (categoryName) => {
  try {
    const data = await fetch(
      `${BaseUrl}${endpoints.allproducts}/category/${categoryName}`
    );
    const res = await data.json();
    return res?.products;
  } catch (error) {
    console.error(error);
  }
};
