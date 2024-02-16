import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/ShoppingCartContext";
import { OrderComponentSkeleton } from "../skeletons";
import { Loader, NoOrdersSection, OrdersList } from "../components";

const OrdersPage = () => {
  const { pathname } = useLocation();
  const { userProfile, isUserLoading, isUserAuthenticated, fetchUserProfile } =
    useAuthContext();
  const { cartCount, setOpenCartModal } = useCartContext();
  const [orders, setOrders] = useState([]);
  const [isOrderLoading, setIsOrderLoading] = useState(false);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    const fetchAllOrders = async () => {
      setIsOrderLoading(true);
      try {
        const { data } = await axios.get(`/orders/${userProfile?._id}`);
        console.log({ data });
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
      <Loader />
    );
  }

  if (!isUserAuthenticated) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  if (isOrderLoading) {
    return <OrderComponentSkeleton />;
  }

  if (orders.length === 0) {
    return <NoOrdersSection
      cartCount={cartCount}
      setOpenCartModal={setOpenCartModal}
    />
  }

  return <OrdersList orders={orders} />
};

export default OrdersPage;
