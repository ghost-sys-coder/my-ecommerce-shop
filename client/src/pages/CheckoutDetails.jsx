import { useEffect, useState } from "react";
import { FaCcPaypal, FaTimes } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Loader } from "lucide-react";
import { useCartContext } from "../context/ShoppingCartContext";
import { useAuthContext } from "../context/AuthContext";
import { handleCheckoutFormValidation } from "../utils/validation";
import { toastErrorOptions } from "../constants";
import { deleteAllProductsCartForUser } from "../../apis";

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { userProfile, isUserLoading, isUserAuthenticated } = useAuthContext();
  const { cart, totalPrice, setCart, setTotalPrice, setCartCount } = useCartContext();
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
          postalCode: details.postalCode
        },
        paymentMethod: details.paymentMethod,
        totalAmount: details.totalAmount,
        products: details.products
      });
      if (response.status === 200) {
        const status = await deleteAllProductsCartForUser(`cart/delete/all/${userProfile?._id}/delete-all`);

        if (status === 200) {
          toast.success("Your order has been placed!")
          setCart(undefined);
          setCartCount(undefined);
          setTotalPrice(undefined);

          setTimeout(() => {
            navigate(`/checkout/orders/`)
          }, 2000);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Your order failed! Try again!', toastErrorOptions)
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (isUserLoading) {
    return (
      <main className="min-h-screen flex justify-center items-center">
        <Loader2 size={100} className="text-white font-extrabold" />
      </main>
    );
  }

  return (
    <>
      {isUserAuthenticated ? (
        <div className="checkout-details">
          {isPlacingOrder && (
            <div className="z-30 fixed left-0 right-0 top-0 bottom-0 w-full h-full flex justify-center items-center gap-4 bg-gray-800  backdrop-filter backdrop-blur-sm bg-opacity-10 px-4">
              <Loader size={100} className="text-theme-500 animate-spin" />
              <p className="font-bold text-sm sm:text-xl text-theme-700">
                Your order is being placed!
              </p>
            </div>
          )}
          <div className="buyer-details">
            <form className="checkout-form">
              <h1 className="title">Details</h1>
              <div className="flex-inputs">
                <div className="input-container">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name..."
                    value={details.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Provide your email..."
                    value={details.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-inputs">
                <div className="input-container">
                  <label htmlFor="mobileNo">Mobile Number:</label>
                  <input
                    type="tel"
                    name="mobileNo"
                    id="mobileNo"
                    placeholder="+256 750 242627"
                    value={details.mobileNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter your address..."
                    value={details.address}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-inputs">
                <div className="input-container">
                  <label htmlFor="houseNo">House Number:</label>
                  <input
                    type="text"
                    name="houseNo"
                    id="houseNo"
                    placeholder="Enter house number if available..."
                    value={details.houseNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="streetNo">Street Number:</label>
                  <input
                    type="text"
                    name="streetNo"
                    id="streetNo"
                    placeholder="Provide street if available..."
                    value={details.streetNo}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-inputs">
                <div className="input-container">
                  <label htmlFor="landMark">Land Mark:</label>
                  <input
                    type="text"
                    name="landMark"
                    id="landMark"
                    placeholder="Provider nearest landmark..."
                    value={details.landMark}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="city">City:</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Enter your city..."
                    value={details.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex-inputs">
                <div className="input-container">
                  <label htmlFor="country">Country:</label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    placeholder="Enter your country..."
                    value={details.country}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="postalCode">Postal Code:</label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    placeholder="Provide your postalCode ... 00256"
                    value={details.postalCode}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>
            <div className="payment-details">
              <h2 className="title">Payment method</h2>
              <p className="sub-title">Choose your payment provider</p>

              <div className="payment-options">
                {["Cash On Delivery"].map(
                  (option, index) => (
                    <div
                      key={index}
                      className={
                        selectedOption === index
                          ? "payment-option-selected"
                          : "payment-option"
                      }
                    >
                      <div
                        className={
                          selectedOption === index
                            ? "selected-option"
                            : "select-option"
                        }
                        onClick={() => handlePaymentMethod(index, option)}
                      />
                      <button
                        onClick={() => handlePaymentMethod(index, option)}
                        role={option}
                        className={option.toLowerCase().replace(/ /g, "-").replace(/\s/g, '')}
                        type="button"
                      >
                        <span>{`Pay with ${option}`}</span>
                        {option === "Paypal" && <FaCcPaypal />}
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="cart-summary">
            {cart?.map((item) => (
              <div className="cart-product" key={item?._id}>
                <div className="left">
                  <div className="image">
                    <img src={item?.product?.images[0]} alt="product image" />
                  </div>
                  <div className="content">
                    <h1 className="title">{item?.product?.title}</h1>
                    <p className="price">
                      UGX {item?.product?.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="right">
                  <FaTimes />
                  <span>{item?.quantity}</span>
                </div>
              </div>
            ))}
            <div className="total">
              <p>TOTAL</p>
              <h3>UGX {totalPrice?.toLocaleString()}</h3>
            </div>
            <button
              onClick={handleOrderPlacement}
              className="pay-btn"
              type="button"
            >
              Place your Order
            </button>
          </div>
          <Toaster position="top-center" />
        </div>
      ) : (
        <Navigate to={`/login?redirectTo=${pathname}`} />
      )}
    </>
  );
};

export default CheckoutDetails;
