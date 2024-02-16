import { useState, useEffect, useCallback } from "react";
import { Navigate, Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames";
import emailjs from "@emailjs/browser";
import { useAuthContext } from "../context/AuthContext.jsx";
import { ShippingAddress, OrderItems, OrderStatus, PaymentStatus, PayButtons, Loader } from "../components/index.js";
import { OrdersPageSkeleton } from "../skeletons/index.js";
import { toastErrorOptions, toastOptions } from "../constants/index.js";
import { useCartContext } from "../context/ShoppingCartContext.jsx";

const CheckoutSingleOrder = () => {
  const { pathname } = useLocation();
  const orderId = pathname.split("/")[3];
  const navigate = useNavigate();
  const { userProfile, fetchUserProfile, isUserLoading, isUserAuthenticated } =
    useAuthContext();
  const { exchangeRate, isRateLoading } = useCartContext();
  const [order, setOrder] = useState(undefined);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);
  const [isCompletingOrder, setIsCompletingOrder] = useState(false);


  const orderStatus = classNames({
    'status-order-placed': order?.status === 'Order Placed',
    'status-processing': order?.status === 'Processing',
    'status-shipped': order?.status === 'Shipped',
    'status-delivered': order?.status === 'Delivered',
  });

  const onPaymentStatus = classNames({
    'payment-pending': order?.paymentStatus === 'Pending',
    'payment-complete': order?.paymentStatus === 'Complete'
  })

 
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);



  /** fetch orders */
  const fetchOrder = useCallback(async () => {
    setIsFetchingOrders(true);
    try {
      const { data } = await axios.get(`/orders/order/${userProfile?._id}/${orderId}`);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingOrders(false);
    }
  }, [orderId, userProfile?._id]);
  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);


  /** handle emailjs */
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
  }, [])


  /** finalise order by cash on delivery */
  const handleOrderByCashOnDelivery = async (event) => {
    event.preventDefault();
    setIsCompletingOrder(true);
    try {
      const { status } = await axios.put(`/cash-on-delivery/${order?._id}`, {
        paymentResult: {
          id: order?._id,
          status: 'Payment Complete!',
          updatedTime: Date.now(),
          emailAddress: userProfile?.email
        },
        status: 'Processing',
        isPaid: true,
        paidAt: Date.now(),
      });

      toast.success('Order has been successful!', toastOptions)
      if (status === 200) {
        // await fetchOrder();
        
        /** sending thank you email to customer */
        const response = await emailjs.send(serviceId, templateId, {
          name: userProfile?.name,
          userEmail: userProfile?.email
        });

        if (response.status === 200) {
          navigate("/checkout/success")
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Your order failed! Try again!', toastErrorOptions);
    } finally {
      setIsCompletingOrder(false);
    }
  }

  if (isUserLoading) {
    return (
      <Loader />
    );
  }

  return isUserAuthenticated ? (
    isFetchingOrders ? (
      <OrdersPageSkeleton />
    ) : (
      <div className="order-page">
        {order === undefined && (
          <div className="w-full h-[500px] flex flex-col gap-4 justify-center items-center">
            <h1 className="text-theme-700 font-bold text-2xl">
              You have no orders!
            </h1>
            <p className="text-xl font-semibold text-theme-700">
              Add products to your cart.
            </p>
            <Link
              className="py-2 px-6 rounded-sm bg-theme-500 text-white font-medium text-xl"
              to={"/"}
            >
              Back to shopping!
            </Link>
          </div>
        )}
        {order !== undefined && (
          <div className="orders">
            <div className="order-info" key={order?._id}>
                  <h1 className="order-title">Order {order?._id}</h1>
                  <ShippingAddress shippingAddress={order?.shippingAddress} />
                  <div className={orderStatus}>
                    <OrderStatus type={'order-page'} status={order?.status} />
                  </div>
                  <div className="payment">
                    <h2 className="title">Payment Method</h2>
                    <div className="info">
                      <h3>Method:</h3>
                      <p>{order?.paymentMethod}</p>
                    </div>
                  </div>
                  <hr />
                  <div className={onPaymentStatus}>
                    <PaymentStatus paymentStatus={order?.paymentStatus} />
                  </div>
                  <OrderItems products={order?.products} />
                </div>
          </div>
        )}
        {order !== undefined && (
          <div className="order-summary">
            <h1 className="title">Order Summary</h1>
            <div className="info">
              <h3>Items</h3>
                {/* <p>UGX {order?.totalAmount.toLocaleString()}</p> */}
                <p>$ {isRateLoading ? '000' : Math.ceil(order?.totalAmount * exchangeRate) + 0.99}</p>
            </div>
            <div className="info">
              <h3>Total</h3>
                {/* <p>UGX {order?.totalAmount.toLocaleString()}</p> */}
                <p>$ {isRateLoading ? '000' : Math.ceil(order?.totalAmount * exchangeRate) + 0.99}</p>
            </div>
            <div className="pay">
                <PayButtons
                  isCompletingOrder={isCompletingOrder}
                  handleOrderByCashOnDelivery={handleOrderByCashOnDelivery}
                  paymentMethod={order?.paymentMethod}
                  orderStatus={order?.status}
                  totalAmount={order?.totalAmount}
                  fetchOrder={fetchOrder}
                  orderId={orderId}
                  order={order}
                />
            </div>
          </div>
          )}
          <Toaster position="top-right" />
      </div>
    )
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default CheckoutSingleOrder
