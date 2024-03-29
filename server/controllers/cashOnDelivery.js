import Order from "../models/Order.js";
import { mongoConnect } from "../database/mongoose.js";

/**
 * ! Pay with cash on delivery
 */

const cashOnDelivery = async (req, res) => {
    await mongoConnect();
    try {
        const { id } = req.params;
        const orderCompleted = await Order.findByIdAndUpdate(id, req.body, { new: true });
        console.log({orderCompleted})
        return res.status(200).json(orderCompleted);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}



export {
    cashOnDelivery
}