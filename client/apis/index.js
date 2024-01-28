import axios from "axios";


export const deleteAllProductsCartForUser = async (apiUrl) => {
    try {
        const { status } = await axios.delete(apiUrl);
        return status;
    } catch (error) {
        console.log(error);
    }
}
