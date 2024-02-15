/* eslint-disable react/prop-types */
import { CashOnDeliveryBtn, BankAndMobileMoney } from "../components";

const PayButtons = ({
  paymentMethod,
  handleOrderByCashOnDelivery,
  isCompletingOrder,
  order,
  orderId,
  totalAmount,
  fetchOrder,
  orderStatus
}) => {
  if (order?.isPaid) {
    return (
      <div className="flex justify-center items-center bg-green-600 opacity-75 py-2">
        <p className="text-white sm:text-xl text-sm">
          Thank you for shopping with us
        </p>
      </div>
    );
  }

  // Render different buttons based on the payment method
  switch (paymentMethod) {
    case "Cash On Delivery":
      return (
        <CashOnDeliveryBtn
          handleOrderByCashOnDelivery={handleOrderByCashOnDelivery}
          isCompletingOrder={isCompletingOrder}
          order={order}
          orderStatus={orderStatus}
        />
      );
    case "Bank Card Or Mobile Money":
      return <BankAndMobileMoney
        order={order}
      />;
    default:
      return null;
  }
};

export default PayButtons;
