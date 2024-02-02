/* eslint-disable react/prop-types */
import { FaTimes } from "react-icons/fa"

const CartSummary = ({cart, totalPrice, handleOrderPlacement}) => {
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
                <p className="price">
                  UGX {item?.product?.price.toLocaleString()}
                </p>
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
          <h3>UGX {totalPrice?.toLocaleString()}</h3>
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