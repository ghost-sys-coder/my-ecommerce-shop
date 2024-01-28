/* eslint-disable react/prop-types */

const ShippingAddress = ({ shippingAddress: { name, email, address, city, landMark, mobileNo } }) => {
  return (
    <div className="shipping-info">
          <h2 className="title">Shipping</h2>
          <div className="info">
              <h3>Name:</h3>
              <p>{name}</p>
          </div>
          <div className="info">
              <h3>Email:</h3>
              <p>{email}</p>
          </div>
          <div className="info">
              <h3>Phone Number:</h3>
              <p>{mobileNo}</p>
          </div>
          <div className="info">
              <h3>Address:</h3>
              <p>{address}</p>
          </div>
          <div className="info">
              <h3>City:</h3>
              <p className="capitalize">{city}</p>
          </div>
          <div className="info">
              <h3>Landmark:</h3>
              <p>{landMark}</p>
          </div>
    </div>
  );
};

export default ShippingAddress;
