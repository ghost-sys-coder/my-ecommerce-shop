/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { PaymentStatus, OrderStatus } from "../components";
import { useCartContext } from "../context/ShoppingCartContext";

const OrderItem = ({
  id,
  products,
  paymentMethod,
  totalAmount,
  paymentStatus,
  status,
}) => {

  const { exchangeRate, isRateLoading } = useCartContext();


  return (
    <Link className="container" key={id} to={`/checkout/orders/${id}`}>
      <div className="image">
        <img src={products[0]?.product?.images[0]} alt="order" />
      </div>
      <div className="content">
        <div>
          <h3>Total Amount:</h3>
          <p>$ {isRateLoading ? '0000' : Math.ceil(totalAmount * exchangeRate) + 0.99}</p>
        </div>
        <div>
          <h3>Payment Method:</h3>
          <p>{paymentMethod}</p>
        </div>
        <div>
          <h3>Payment Status:</h3>
          <PaymentStatus
            type={'order-item'}
           paymentStatus={paymentStatus} 
           />
        </div>
        <div className="order-status">
          <h3>Order Status:</h3>
          <OrderStatus type={'order-item'} status={status} />
        </div>
      </div>
    </Link>
  );
};

export default OrderItem;
