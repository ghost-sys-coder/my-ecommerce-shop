/* eslint-disable react/prop-types */

const ShippingAddress = ({ shippingAddress }) => {
  return (
    <div className="shipping-info">
          <h2 className="title">Shipping</h2>
          <div className="info">
              <h3>Name:</h3>
              <p>{shippingAddress?.name}</p>
          </div>
          <div className="info">
              <h3>Email:</h3>
              <p>{shippingAddress?.email}</p>
          </div>
          <div className="info">
              <h3>Phone Number:</h3>
              <p>{shippingAddress?.mobileNo}</p>
          </div>
          <div className="info">
              <h3>Address:</h3>
              <p>{shippingAddress?.address}</p>
          </div>
          <div className="info">
              <h3>City:</h3>
              <p className="capitalize">{shippingAddress?.city}</p>
          </div>
          <div className="info">
              <h3>Landmark:</h3>
              <p>{shippingAddress?.landMark}</p>
          </div>
    </div>
  );
};

export default ShippingAddress;
