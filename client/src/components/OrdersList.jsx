/* eslint-disable react/prop-types */
import { OrderItem } from "../components";

const OrdersList = ({ orders }) => {

  return (
    <div className="orders-page">
    {orders &&
      orders?.map(
        ({
          _id,
          products,
          paymentMethod,
          totalAmount,
          paymentStatus,
          status,
        }) => (
              <OrderItem
                  key={_id}
                  id={_id}
                  products={products}
                  paymentMethod={paymentMethod}
                  totalAmount={totalAmount}
                  paymentStatus={paymentStatus}
                  status={status}
              />
        )
      )}
  </div>
  )
}

export default OrdersList