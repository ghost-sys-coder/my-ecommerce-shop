/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { useCartContext } from "../context/ShoppingCartContext";

const OrderItems = ({ products }) => {
    const { exchangeRate, isRateLoading } = useCartContext();

  return (
      <div className="order-items">
          <h1 className="title">Order Items</h1>
          <div className="items">
          {products?.map((item) => (
              <div className="item" key={item?._id}>
                  <img src={item?.product?.images[0]} alt={item?.product?.title} />
              <div className="flex flex-col gap-1">
                      <h2 className="text-sm text-theme-700 font-semibold">{item?.product?.title}</h2>
                      
                      {isRateLoading ? (
                              <div className="flex justify-center items-center gap-2  text-theme-700">
                                  <Loader2 />
                                  <p>Loading...</p>
                            </div>
                          ) : (
                              <p className="text-sm text-theme-700 font-semibold">
                                  {item?.quantity} * USD {Math.ceil(item?.price * exchangeRate) + 0.99} = USD {Math.ceil(item?.price * item?.quantity * exchangeRate) + 0.99}
                             </p>
                          ) }
                  </div>
              </div>
              ))}
          </div>
    </div>
  )
}

export default OrderItems