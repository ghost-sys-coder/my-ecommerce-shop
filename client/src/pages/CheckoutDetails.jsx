import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useCartContext } from "../context/ShoppingCartContext";
import { useAuthContext } from "../context/AuthContext";
import { handleCheckoutFormValidation } from "../utils/validation";
import { toastErrorOptions } from "../constants";
import { deleteAllProductsCartForUser } from "../apis";
import { CartSummary, CheckoutDetailsForm, Loader } from "../components";

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userProfile, isUserLoading, isUserAuthenticated } = useAuthContext();
  const { cart, totalPrice, setCart, setTotalPrice, setCartCount } =
    useCartContext();
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [details, setDetails] = useState({
    userId: userProfile?._id,
    name: "",
    email: "",
    mobileNo: "",
    houseNo: "",
    streetNo: "",
    landMark: "",
    address: "",
    city: "",
    country: "Uganda",
    postalCode: "",
    paymentMethod: "",
    products: [
      {
        productId: "",
        price: "",
        quantity: "",
      },
    ],
    totalAmount: 0,
  });

  /** handle input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails((values) => ({ ...values, [name]: value }));
  };

  /** handle and update payment method */
  const handlePaymentMethod = (index, option) => {
    setSelectedOption(index);
    setDetails((values) => ({
      ...values,
      paymentMethod: option,
    }));
  };

  /** handle products array update */
  useEffect(() => {
    /** Update the products field in details whenever the cart changes */
    const updatedProducts = cart?.map((item) => ({
      product: item?.product?._id,
      price: item?.product?.price,
      quantity: item?.quantity,
    }));

    /** Calculate the total amount based on the updated products */
    const updatedTotalAmount = updatedProducts?.reduce(
      (total, product) => total + product?.price * product?.quantity,
      0
    );

    setDetails((prevDetails) => ({
      ...prevDetails,
      products: updatedProducts,
      totalAmount: updatedTotalAmount,
    }));
  }, [cart]);

  /** handle place order */
  const handleOrderPlacement = async (e) => {
    e.preventDefault();
    await handleCheckoutFormValidation(details);
    setIsPlacingOrder(true);

    try {
      const response = await axios.post("/orders/create", {
        user: userProfile._id,
        shippingAddress: {
          name: details.name,
          email: details.email,
          mobileNo: details.mobileNo,
          houseNo: details.houseNo,
          streetNo: details.streetNo,
          landMark: details.landMark,
          address: details.address,
          city: details.city,
          country: details.country,
          postalCode: details.postalCode,
        },
        paymentMethod: details.paymentMethod,
        totalAmount: details.totalAmount,
        products: details.products,
      });
      if (response.status === 200) {
        const status = await deleteAllProductsCartForUser(
          `cart/delete/all/${userProfile?._id}/delete-all`
        );

        if (status === 200) {
          toast.success("Your order has been placed!");
          setCart(undefined);
          setCartCount(undefined);
          setTotalPrice(undefined);

          setTimeout(() => {
            navigate(`/checkout/orders/${response.data._id}`);
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Your order failed! Try again!", toastErrorOptions);
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isUserLoading) {
    return (
      <Loader />
    );
  }

  if (!isUserAuthenticated) {
    return <Navigate to={`/login?redirectTo=${pathname}`} />;
  }

  return (
    <div className="checkout-details">
      {isPlacingOrder && (
        <div className="z-30 fixed left-0 right-0 top-0 bottom-0 w-full h-full flex justify-center items-center gap-4 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-10 px-4">
          <Loader2 size={100} className="text-theme-500 animate-spin" />
          <p className="font-bold text-sm sm:text-xl text-theme-700">
            Your order is being placed!
          </p>
        </div>
      )}
      <div className="buyer-details">
        <CheckoutDetailsForm
          details={details}
          handleChange={handleChange}
          selectedOption={selectedOption}
          handlePaymentMethod={handlePaymentMethod}
        />
      </div>
      <CartSummary
        cart={cart}
        totalPrice={totalPrice}
        handleOrderPlacement={handleOrderPlacement}
      />
      <Toaster position="top-center" />
    </div>
  );
};

export default CheckoutDetails;
