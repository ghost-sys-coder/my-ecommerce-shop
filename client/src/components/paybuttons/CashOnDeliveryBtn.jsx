/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";

const CashOnDeliveryBtn = ({handleOrderByCashOnDelivery, isCompletingOrder, order, orderStatus}) => {
  return (
    <>
      {!order?.isPaid && (
        <div className="flex gap-2 justify-center items-center flex-col">
          <p className="text-center font-semibold text-theme-700">{"Your order will be paid for once it's delivered to you!"}</p>
          <button
            className="pay-button"
            type="button"
            onClick={handleOrderByCashOnDelivery}
            disabled={orderStatus === 'Processing' || orderStatus === 'Delivered'}
          >
            {isCompletingOrder ? (
              <>
                <Loader2 className="animate-spin" />
              <span>Processing your Order...</span>
              </>
            ) :orderStatus === 'Processing' ? (
                <span>Your order will be delivered with in the next 24 hours!</span>
              ) : (
                  <span>Complete your Order</span>
            )}
          </button>
        </div>
      )}
    </>
  )
}

export default CashOnDeliveryBtn