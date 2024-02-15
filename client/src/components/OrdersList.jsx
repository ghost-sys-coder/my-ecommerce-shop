/* eslint-disable react/prop-types */
import { OrderItem, NoOrdersSection } from "../components";
import { OrderComponentSkeleton } from "../skeletons";

const OrdersList = ({
  orders,
  cartCount,
  setOpenCartModal,
  isOrderLoading,
}) => {
  // handle no orders section
  if (orders?.length === 0) {
    return (
      <NoOrdersSection
        cartCount={cartCount}
        setOpenCartModal={setOpenCartModal}
      />
    );
  }

  return isOrderLoading ? (
    <OrderComponentSkeleton />
  ) : (
    <div className="orders-page">
        {orders?.map(
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
  );
};

export default OrdersList;
