import axios from "axios";

/** delete products from cart */
export const deleteAllProductsCartForUser = async (apiUrl) => {
    try {
        const { status } = await axios.delete(apiUrl);
        return status;
    } catch (error) {
        console.log(error);
    }
}

/** request pesapal auth token */
export const requestAuthToken = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const raw = JSON.stringify({
      consumer_key: import.meta.env.VITE_PESAPAL_CONSUMER_KEY,
      consumer_secret: import.meta.env.VITE_PESAPAL_CONSUMER_SECRET,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
        const response = await fetch("https://pay.pesapal.com/v3/api/Auth/RequestToken", requestOptions);
        const result = await response.text();
        const { token, status }  = await JSON.parse(result);
  
        return { token, status }
    } catch (error) {
        console.log(error);
    }

}


/** submit order request */
export const submitOrderRequestToPesapal = async (token) => {
    console.log('token test', token)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`)
    
    const raw = JSON.stringify({
      "id": "TEST1515111110",
      "currency": "UGX",
      "amount": 100,
      "description": "Payment description goes here",
      "callback_url": "http://localhost:5173/orders",
      "notification_id": "fe078e53-78da-4a83-aa89-e7ded5c456e6",
      "billing_address": {
        "email_address": "margretsarah999@gmail.com",
        "phone_number": null,
        "country_code": "",
        "first_name": "Tamale",
        "middle_name": "",
        "last_name": "Frank",
        "line_1": "",
        "line_2": "",
        "city": "",
        "state": "",
        "postal_code": null,
        "zip_code": null
      }
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest", requestOptions)
      .then(response => response.text())
      .then(result => console.log({result}))
        .catch(error => console.log('error', error)); 
    
    try {
        const response = await fetch("https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest", requestOptions);
        const result = await response.text();
        console.log({ result: JSON.parse(result) });

        return {result}
    } catch (error) {
        console.log(error);
    }

}
