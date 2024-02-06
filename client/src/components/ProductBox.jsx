/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useCartContext } from "../context/ShoppingCartContext";

const ProductBox = ({ product }) => {
  const { isRateLoading, exchangeRate } = useCartContext();

  return (
    <Link
      to={`/products/${product?.title}/${product?._id}`}
      className="flex flex-col gap-2 relative shadow-2xl overflow-hidden rounded-md h-max"
    >
      <img
        src={product?.images[0]}
        alt={product?.category}
        className="w-full h-[200px] object-cover"
      />
      <div className="flex flex-col gap-[1px] px-3">
        <h2 className="font-semibold text-theme-700 text-sm">
          {product?.title.slice(0, 25)}...
        </h2>
        <p className="font-semibold text-sm text-theme-700">
          {/* UGX {product?.price.toLocaleString()} */}
           ${ isRateLoading ? 'Loading...' : (Math.ceil(product?.price * exchangeRate) + 0.99)}
        </p>
        <span className="line-through text-sm font-bold text-gray-400 font-semibold">
          {/* UGX {product?.price * 1.2} */}
           ${ isRateLoading ? 'Loading...' : (Math.ceil(product?.price * exchangeRate * 1.2) + 0.99)}
        </span>
      </div>
      <div className="product-rating">
        <span>4.5</span>
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStar />
        <FaStarHalfAlt />
      </div>
    </Link>
  );
};

export default ProductBox;
