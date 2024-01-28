/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AiOutlineShopping } from "react-icons/ai";
import { MdArrowBackIos } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

import { useCartContext } from "../context/ShoppingCartContext";

const CartModal = ({ setOpenCartModal }) => {
  const quantityRef = useRef();
  const {
    cartCount,
    cart,
    handleIncrementCartItemQuantity,
    handleDecreaseCartItemQuantity,
    handleDeleteCart,
    totalPrice,
  } = useCartContext();

  return (
    <div className="cart-modal">
      <div className="container">
        <div className="close">
          <MdArrowBackIos onClick={() => setOpenCartModal(false)} size={20} />
          <h1>
            Your Cart <span>({cartCount === undefined || 0 ? 0 : cartCount} items)</span>
          </h1>
        </div>
        <div className="cart-products">
          {cart?.length === undefined || cart?.length === 0 ? (
            <div className="empty-cart">
              <AiOutlineShopping size={100} />
              <h1>Your Shopping Bag is empty</h1>
              <Link to={"/"}> CONTINUE SHOPPING</Link>
            </div>
          ) : (
            <>
              <div className="shopping-cart">
                {cart?.map((item) => (
                  <div className="cart-product" key={item._id}>
                    <div className="image">
                      <img src={item?.product?.images[0]} alt="product image" />
                    </div>
                    <div className="content">
                      <h1 className="title">{item?.product?.title}</h1>
                      <p className="price">
                        UGX {item?.product?.price.toLocaleString()}
                      </p>
                      <div className="quantity-btns">
                        <button
                          disabled={item.quantity === 1}
                          onClick={() =>
                            handleDecreaseCartItemQuantity(item._id)
                          }
                          type="button"
                        >
                          -
                        </button>
                        <p ref={quantityRef} className="quantity">
                          {item?.quantity}
                        </p>
                        <button
                          onClick={() =>
                            handleIncrementCartItemQuantity(item._id)
                          }
                          type="button"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div
                      onClick={() => handleDeleteCart(item._id)}
                      className="remove-product"
                    >
                      <FaTimes />
                    </div>
                  </div>
                ))}
              </div>
              {cart?.length !== undefined && cart?.length !== 0 && (
                <>
                  <div className="total-price">
                    <h2>Subtotal:</h2>
                    <p>UGX {totalPrice?.toLocaleString()}</p>
                  </div>
                  <div className="checkout-link">
                    <Link to={"/checkout/details"}>
                      <FaShoppingBag />
                      <span>Proceed to Checkout</span>
                    </Link>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
