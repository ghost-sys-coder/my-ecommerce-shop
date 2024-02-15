/* eslint-disable react/prop-types */
import { useState } from "react";
import { paymentOptionImages } from "../../constants/images";
import { requestAuthToken, submitOrderRequestToPesapal } from "../../../apis";

const BankAndMobileMoney = ({ order }) => {
  const handleFetchPesaPalToken = async () => {
    const { status, token } = await requestAuthToken();
    console.log({ status, token });

    if (status === '200') {
      const { result } = await submitOrderRequestToPesapal(token);
      console.log({result})
    } else {
      alert('Payment failed!')
    }
  }
  return (
    <>
      {!order?.isPaid && (
        <div>
          <button className="w-full flex flex-col gap-2" type="button"
            onClick={handleFetchPesaPalToken}
          >
            <div className="flex gap-2 justify-between items-center w-full">
              {paymentOptionImages.map((optionImg, i) => (
                <img
                  className="flex-1 h-[30px] object-cover rounded-sm"
                  key={i}
                  src={optionImg}
                  alt="payment option"
                />
              ))}
            </div>
            <span className="block w-full text-center py-2 px-2 bg-theme-700 text-white">
              Complete Purchase
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default BankAndMobileMoney;
