/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const CashOnDeliveryBtn = ({
  handleOrderByCashOnDelivery,
  orderStatus,
  isCompletingOrder,
  order,
}) => {
  return (
    <>
      {!order?.isPaid && (
        <div className="flex flex-col gap-2 items-center justify-center">
          <p className="font-semibold text-theme-500 text-center">{"Your order will be paid for once it's delivered!"}</p>
          <button
          onClick={handleOrderByCashOnDelivery}
          type="button"
          disabled={orderStatus === "Processing" || orderStatus === "Delivered"}
        >
          {isCompletingOrder ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Processing your Order...</span>
            </>
          ) : orderStatus === "Processing" ? (
            <span>Your order will be delivered!</span>
          ) : (
            <span>Complete your Order</span>
          )}
        </button>
        </div>
      )}
    </>
  );
};

export default CashOnDeliveryBtn;
