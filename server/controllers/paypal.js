import Order from "../models/Order.js";

/**
 * ! PUT 
 * ! Update order paid to true
 */
const updateOrderToPaid = async (req, res) => {
    const { details } = req.body;
    try {
        const { id } = req.params;
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            {
                isPaid: true,
                paidAt: Date.now(),
                paymentResult: {
                    id: id,
                    status: details.status,
                    updatedTime: details.update_time,
                    emailAddress: details.payer?.email_address
                },
                paymentStatus: 'Complete',
                status: 'Processing'
            },
            {new: true}
        );
        return res.status(200).json(updatedOrder);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


export {
    updateOrderToPaid
}