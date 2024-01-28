import { useState, useEffect, useCallback } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { ShippingAddress, OrderItems } from "../components";
import { OrdersPageSkeleton } from "../skeletons";

const CheckoutOrders = () => {
  const { userProfile, fetchUserProfile, isUserLoading, isUserAuthenticated } =
    useAuthContext();
  const [orders, setOrders] = useState([]);
  const [isFetchingOrders, setIsFetchingOrders] = useState(false);


 
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  /** fetch orders */
  const fetchOrders = useCallback(async () => {
    setIsFetchingOrders(true);
    try {
      const { data } = await axios.get(`/orders/${userProfile?._id}`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingOrders(false);
    }
  }, [userProfile?._id]);
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  if (isUserLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Loader2 size={100} className="text-white font-extrabold" />
      </main>
    );
  }

  return isUserAuthenticated ? (
    isFetchingOrders ? (
      <OrdersPageSkeleton />
    ) : (
      <div className="orders-page">
        {orders.length === 0 && (
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
        {orders?.length !== 0 && (
          <div className="orders">
            {orders.map(
              ({
                _id,
                shippingAddress,
                status,
                paymentMethod,
                products,
                paymentStatus,
              }) => (
                <div className="order-info" key={_id}>
                  <h1 className="order-title">Order {_id}</h1>
                  <ShippingAddress shippingAddress={shippingAddress} />
                  <div className="status">
                    <p>Your order has {status}</p>
                  </div>
                  <div className="payment">
                    <h2 className="title">Payment Method</h2>
                    <div className="info">
                      <h3>Method:</h3>
                      <p>{paymentMethod}</p>
                    </div>
                  </div>
                  <hr />
                  <div className="status">Payment {paymentStatus}</div>
                  <OrderItems products={products} />
                </div>
              )
            )}
          </div>
        )}
        {orders?.length !== 0 && (
          <div className="order-summary">
            <h1 className="title">Order Summary</h1>
            <div className="info">
              <h3>Items</h3>
              <p>UGX {orders[0]?.totalAmount.toLocaleString()}</p>
            </div>
            <div className="info">
              <h3>Total</h3>
              <p>UGX {orders[0]?.totalAmount.toLocaleString()}</p>
            </div>
            <div className="pay">
                {orders[0]?.paymentMethod === 'Cash On Delivery' && (
                  <button type="button">Order for your Product!</button>
              )}
            </div>
          </div>
        )}
      </div>
    )
  ) : (
    <Navigate to={"/login"} replace />
  );
};

export default CheckoutOrders;
