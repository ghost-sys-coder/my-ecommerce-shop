import { useState, useEffect } from "react";
import axios from "axios";
import { ProductBoxSkeleton } from "../skeletons";
import { ProductBox } from "../components";

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    const [isProductsLoading, setIsProductsLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsProductsLoading(true);
            try {
                const { data } = await axios.get("/products/get/all/products");
                setProducts(data);
                console.log({data})
            } catch (error) {
                console.log(error)
            } finally {
                setIsProductsLoading(false);
            }
        }
        fetchProducts();
    }, [])

  return (
      <div className="products-grid">
          {isProductsLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductBoxSkeleton key={index} />
            ))
          ): (
                  products?.map((product) => (
                <ProductBox key={product?._id} product={product} />
            ))
        )}  
    </div>
  )
}

export default ProductsGrid