import { useState, useEffect } from "react";
import axios from "axios";
import {
  CategoryList,
  CategorySlider,
  ProductSlider,
  ProductsGrid,
} from "../components";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  /** fetch product categories */
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get("/categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="homepage">
      <div className="flex gap-3">
        <CategoryList isLoading={isLoading} categories={categories} />
        <ProductSlider />
      </div>
      <div className="mb-10">
        <CategorySlider isLoading={isLoading} categories={categories} />
      </div>
      <div className="my-10 sm:my-5">
        <div className="flex justify-center items-center w-full text-center">
          <h1 className="text-3xl sm:text-xl font-bold text-theme-700">
            Best Selling Products
          </h1>
        </div>
        <ProductsGrid />
      </div>
    </div>
  );
};

export default Home;
