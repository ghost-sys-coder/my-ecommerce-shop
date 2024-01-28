/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react"
import { Link } from "react-router-dom";
import axios from "axios";
import ProductBox from "./ProductBox";
import { MiniProductSkeleton } from "../skeletons";

const CategoryProducts = ({categories, title}) => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState(undefined);
    const [isproductsLoading, setIsproductsLoading] = useState(false);

    const determineCategory = useCallback(async () => {
        categories.map((categoryItem) => {
            if (title === categoryItem.category) {
               setCategory(categoryItem._id) 
            }
        })
    }, [categories, title])
    
    useEffect(() => {
        const fetchProductsByCategories = async () => {
            await determineCategory();
            setIsproductsLoading(true);
            try {
                const { data } = await axios.get(`/products/${category}`);
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.log(error)
            } finally {
                setIsproductsLoading(false);
            }
        }
        fetchProductsByCategories();
    }, [category, determineCategory])

  return (
      <div className="mb-10">
          <div className="flex justify-between items-center gap-4 bg-theme-500 text-white py-[10px] px-2 rounded-sm">
              <h1 className="font-poppins text-[15px] ">{title}</h1>
              <Link className="font-medium text-sm" to={category}>SEE ALL</Link>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
              {isproductsLoading ? (
                  Array.from({ length: 4 }).map((_, index) => (
                          <MiniProductSkeleton key={index} />
                      ))
              ) : (
                      products.map((product) => (
                          <ProductBox key={product._id} product={product} />
                      ))
              )}
        </div>
    </div>
  )
}

export default CategoryProducts