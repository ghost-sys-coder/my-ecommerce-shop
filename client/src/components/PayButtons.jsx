/* eslint-disable react/prop-types */
import CashOnDeliveryBtn from "./paybuttons/CashOnDeliveryBtn";
import PayPalBtn from "./paybuttons/PayPalBtn";

const PayButtons = ({
  paymentMethod,
  handleOrderByCashOnDelivery,
  isCompletingOrder,
  totalAmount,
  fetchOrder,
  orderId,
  order
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

  // Render different payment buttons based on the payment method

  switch (paymentMethod) {
    case "Cash On Delivery":
      return (
        <CashOnDeliveryBtn
          handleOrderByCashOnDelivery={handleOrderByCashOnDelivery}
          isCompletingOrder={isCompletingOrder}
          order={order}
        />
      );
    case "Paypal":
      return (
        <PayPalBtn
          totalAmount={totalAmount}
          handleFetchOrder={fetchOrder}
          orderId={orderId}
          order={order}
        />
      );
    default:
      return null;
  }
};

export default PayButtons;
