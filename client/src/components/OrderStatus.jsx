/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

const OrderStatus = ({ status, type }) => {
    const [statusText, setStatusText] = useState('');
    const [statusStyle, setStatusStyle] = useState('');

    useEffect(() => {
        if (status === 'Order Placed') {
            setStatusText('Your order has been placed!');
            setStatusStyle('placed');
        } else if (status === 'Processing') {
            setStatusText('Your order has been processed!!');
            setStatusStyle('processing');
        } else if (status === 'Shipped') {
            setStatusText('Your order has been shipped!');
            setStatusStyle('shipped');
        } else if (status === 'Delivered') {
            setStatusText('Your Order has been delivered!');
            setStatusStyle('delivered')
        }  
    }, [status])
    
  return (
      <p className={type === 'order-item' ? statusStyle : ''}>{statusText}</p>
  )
}

export default OrderStatus