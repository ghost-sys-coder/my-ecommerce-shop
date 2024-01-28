/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const AddToCartBtn = ({
  quantity,
  setQuantity,
  handleAddToCart,
  handleBuyNow,
  id,
  isAddingToCart,
  isBuyingNow,
  price,
}) => {
  /** handle quantity increment */
  const handleQuantityIncrement = () => {
    setQuantity((value) => value + 1);
  };

  /** handle quantity decrement */
  const handleQuantityDecrement = () => {
    setQuantity((value) => value - 1);
  };
  return (
    <div className="cart__quantity-btns">
      <div className="quantity-btns">
        <p className="quantity">Quantity:</p>
        <button
          disabled={quantity === 1}
          onClick={handleQuantityDecrement}
          type="button"
        >
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button onClick={handleQuantityIncrement} type="button">
          +
        </button>
      </div>
      <div className="buy-btns">
      <button
        onClick={() => handleAddToCart(id, price)}
        className="cart-btn"
        type="button"
      >
        {isAddingToCart ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Adding to Cart</span>
          </>
        ) : (
          <span>Add to Cart</span>
        )}
        </button>
        <button onClick={()=> handleBuyNow(id, price)} className="buy-now" type="button">
        {isBuyingNow ? (
          <>
            <Loader2 className="animate-spin" />
            <span>Adding to Cart</span>
          </>
        ) : (
          <span>Buy Now</span>
        )}
        </button>
      </div>
    </div>
  );
};

export default AddToCartBtn;
