/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

const PaymentStatus = ({ paymentStatus }) => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (paymentStatus === 'Pending') {
            setStatus('Your payment is pending!')
        } else if (paymentStatus === 'Complete') {
            setStatus('Your have successfully paid for your product!')
        }else {
            setStatus(paymentStatus)
        }
    },[paymentStatus])
  return (
      <p>{status}</p>
  )
}

export default PaymentStatus