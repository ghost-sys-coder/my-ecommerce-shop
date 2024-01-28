import Order from "../models/Order.js";

/**
 * ! Create a user's order
 */
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    console.log({ order });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

/**
 * ? Fetch orders for a given user
 */
const fetchUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const orders = await Order.find({ user: id })
      .populate("user")
      .populate({
        path: "products.product",
        model: "Product",
      })
      .exec();
    return res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};


/**
 * ! Update order to paid
 * ! PUT /api/orders/:id/pay
 */

const updateOrderToPaid = async (req, res) => {
  try {
    const { id } = req.params;
    /** check for the order */
    const order = await Order.findById(id);

    /** update your order */
    if (order) {
      order.isPaid = true;
      order.paidAt = true;
      order.paymentResult = {
        id: id,
        status: req.body.status,
        updatedTime: req.body.update_time,
        emailAddress: req.body.payer.email_address
      }
      const updatedOrder = await order.save();

      return res.status(200).json(updatedOrder);
    } else {
      return res.status(404).json({error: 'Order not found!'})
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: 'Payment failed!'})
  }
}

export { createOrder, fetchUserOrders, updateOrderToPaid };
