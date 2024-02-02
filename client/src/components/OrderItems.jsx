/* eslint-disable react/prop-types */


const OrderItems = ({ products }) => {

  return (
      <div className="order-items">
          <h1 className="title">Order Items</h1>
          <div className="items">
          {products?.map((item) => (
              <div className="item" key={item?._id}>
                  <img src={item?.product?.images[0]} alt={item?.product?.title} />
              <div className="flex flex-col gap-1">
              <h2 className="text-sm text-theme-700 font-semibold">{item?.product?.title}</h2>
              <p className="text-sm text-theme-700 font-semibold">{item?.quantity} * UGX{item?.price} = UGX{item?.price * item?.quantity}</p>
                  </div>
              </div>
              ))}
          </div>
    </div>
  )
}

export default OrderItems