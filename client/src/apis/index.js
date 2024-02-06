import axios from "axios";

/** delete all products from the user cart */
export const deleteAllProductsCartForUser = async (apiUrl) => {
    try {
        const { status } = await axios.delete(apiUrl);
        return status;
    } catch (error) {
        console.log(error);
    }
}

/** handle exchange rate */
export const handleDollarCurrencyExchange = async (baseCurrencyAmount) => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/UGX');
        const { rates } = await response.json();
        
        if (rates && rates?.USD) {
            const exchangeRate = rates.USD;
            const convertedAmount = baseCurrencyAmount * exchangeRate;

            // Round the converted amount to two decimal places
            const roundedAmount = Math.round(convertedAmount * 100) / 100;
            console.log({exchangeRate, roundedAmount})

            return roundedAmount;
        } else {
            throw new Error('Unable to fetch exchange rates!')
        }
    } catch (error) {
      console.log(error);
    }
  };



