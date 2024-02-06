/* eslint-disable react/prop-types */
import { FaCcPaypal } from "react-icons/fa";

const CheckoutdetailsForm = ({
    details,
    handleChange,
    selectedOption,
    handlePaymentMethod
}) => {
  return (
    <>
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
              value={details?.name}
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
              value={details?.email}
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
              value={details?.mobileNo}
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
              value={details?.address}
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
              value={details?.houseNo}
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
              value={details?.streetNo}
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
              value={details?.landMark}
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
              value={details?.city}
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
              value={details?.country}
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
              value={details?.postalCode}
              onChange={handleChange}
            />
          </div>
        </div>
          </form>
          <div className="payment-details">
              <h2 className="title">Payment method</h2>
              <p className="sub-title">Choose your payment provider</p>

              <div className="payment-options">
                {["Cash On Delivery", "Paypal"].map(
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
    </>
  );
};

export default CheckoutdetailsForm;
