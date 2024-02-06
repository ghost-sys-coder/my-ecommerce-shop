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
      }).sort({ createdAt: -1 }).exec();
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
      order.paidAt = Date.now();
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


/**
 * ? Fetch a single order
 */
const fetchSingleOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.params;
    const checkUser = await Order.findOne({ user: userId });

    if (!checkUser) {
      return res.status(404).json({error: 'Resource not found!'})
    }

    const order = await Order.findById(orderId)
      .populate("user")
      .populate({
        path: 'products.product',
        model: "Product"
      }).exec();
    return res.status(200).json(order);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message})
  }
}

/**
 * ! Check whether a user already bought this product
 */
const checkOrderPurchase = async (req, res) => {
  try {
    const { userId, productId } = req.query;

    const order = await Order.findOne({
      user: userId,
      'products.product': productId,
      status: 'Delivered'
    });

    if (order) {
      return res.status(200).json({ hasPurchased: true });
    } else {
      return res.status(201).json({ hasPurchased: false });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message})
  }
}

export { createOrder, fetchUserOrders, updateOrderToPaid, fetchSingleOrder, checkOrderPurchase };
