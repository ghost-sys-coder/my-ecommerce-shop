/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa";
import { useCartContext } from "../context/ShoppingCartContext";

const CartSummary = ({ cart, totalPrice, handleOrderPlacement }) => {
  const { exchangeRate, isRateLoading } = useCartContext();

  return (
    <div className="cart-summary">
        {cart?.map((item) => (
          <div className="cart-product" key={item?._id}>
            <div className="left">
              <div className="image">
                <img src={item?.product?.images[0]} alt="product image" />
              </div>
              <div className="content">
                <h1 className="title">{item?.product?.title}</h1>
                {/* <p className="price">
                  UGX {item?.product?.price.toLocaleString()}
                </p> */}
                <div className="price">USD {isRateLoading ? '0000' :  Math.ceil(totalPrice * exchangeRate) + .99}</div>
              </div>
            </div>
            <div className="right">
              <FaTimes />
              <span>{item?.quantity}</span>
            </div>
          </div>
        ))}
        <div className="total">
          <p>TOTAL</p>
        <h3>USD {isRateLoading ? '0000' : Math.ceil(totalPrice * exchangeRate) + .99}</h3>
        </div>
        <button
          onClick={handleOrderPlacement}
          className="pay-btn"
          type="button"
        >
          Place your Order
        </button>
      </div>
  )
}

export default CartSummary