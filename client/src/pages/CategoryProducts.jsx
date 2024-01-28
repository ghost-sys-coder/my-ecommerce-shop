import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ProductBoxSkeleton } from "../skeletons";
import { ProductBox } from "../components";


const CategoryProducts = () => {
  const { pathname } = useLocation();
  const [products, setProducts] = useState([]);
  const [isProductsLoading, setIsProductsLoading] = useState(false);
  const categoryId = pathname.split("/")[3];

  useEffect(() => {
    const fetchProducts = async () => {
      setIsProductsLoading(true);
      try {
        const { data } = await axios.get(`products/${categoryId}`);
        setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsProductsLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId]);



  return (
    <div className="category-products">
      {isProductsLoading
        ? Array.from({ length: 8 }).map((_, index) => (
          <ProductBoxSkeleton key={index} />
        ))
        :
        products.map((product) => (
          <ProductBox key={product?._id} product={product} />
        ))}
    </div>
  );
};

export default CategoryProducts;
