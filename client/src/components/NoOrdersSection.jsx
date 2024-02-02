/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NoOrdersSection = ({ cartCount, setOpenCartModal }) => {
  console.log({ cartCount });
  return (
    <div className="orders-page">
      <div className="py-2 px-3 flex flex-col justify-center items-center gap-5 w-full">
        {cartCount !== undefined && cartCount !== 0 ? (
          <p className="sm:text-xl font-semibold text-theme-700">
            You have products in your cart, complete your orders!
          </p>
        ) : (
          <p className="sm:text-xl font-semibold text-theme-700">
            You have no existing orders!
          </p>
        )}
        {cartCount !== undefined && cartCount !== 0 && (
          <div className="flex gap-4 flex-col justify-center items-center w-full">
            <button
              className="py-2 px-4 rounded-md shadow-lg text-white bg-theme-600 cursor-pointer w-full sm:w-[400px]"
              type="button"
              onClick={() => setOpenCartModal(true)}
            >
              Check your cart!
            </button>

            <p className="text-xl font-semibold text-theme-500">Or...</p>
          </div>
        )}
        <Link
          className="py-2 px-4 rounded-md shadow-lg text-white bg-theme-500 hover:opacity-70 w-full sm:w-[400px] flex items-center justify-center"
          to={"/"}
        >
          Go to Shopping
        </Link>
      </div>
    </div>
  );
};

export default NoOrdersSection;
