import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/ShoppingCartContext";
import { OrdersList } from "../components";

const OrdersPage = () => {
  const { pathname } = useLocation();
  const { userProfile, isUserLoading, isUserAuthenticated } = useAuthContext();
  const { cartCount, setOpenCartModal } = useCartContext();
  const [orders, setOrders] = useState([]);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      setIsOrderLoading(true);
      try {
        const { data } = await axios.get(`/orders/${userProfile?._id}`);
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsOrderLoading(false);
      }
    };
    fetchAllOrders();
  }, [userProfile?._id]);

  if (isUserLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Loader2 size={100} className="text-theme-700 font-extrabold" />
        <p className="text-theme-700 font-semibold">Loading, please wait...</p>
      </main>
    );
  }


  return isUserAuthenticated ? (
    <OrdersList
      orders={orders}
      cartCount={cartCount}
      setOpenCartModal={setOpenCartModal}
      isOrderLoading={isOrderLoading}
    />
  ) : (
    <Navigate to={`/login?redirectTo=${pathname}`} />
  );
};

export default OrdersPage;
