import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { MainLayout, AuthLayout } from "./Layouts";
import {
  Home,
  Product,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  CategoryProducts,
  CheckoutDetails,
  CheckoutOrders,
} from "./pages";

export default function App() {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API_URL;
  axios.defaults.withCredentials = true;

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products/:title/:id" element={<Product />} />
        <Route path="categories/:category/:id" element={<CategoryProducts />} />
        <Route path="/checkout/details" element={<CheckoutDetails />} />
        <Route path="/checkout/orders" element={<CheckoutOrders />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
}
