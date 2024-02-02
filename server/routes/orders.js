import { Router } from "express";
import { checkUser } from "../middleware/authentication.js";
import { checkOrderPurchase, createOrder, fetchSingleOrder, fetchUserOrders, updateOrderToPaid,  } from "../controllers/orders.js";


const router = Router();

/**
 * ! Create order
 */
router.post("/create", checkUser, createOrder);

/**
 * ? Fetch orders for a given user
 */
router.get("/:id", checkUser, fetchUserOrders);


/**
 * ! Update order to paid
 */
router.put("/:id/pay", checkUser, updateOrderToPaid);


/**
 * ? Fetch Single Product
 */
router.get("/order/:userId/:orderId", checkUser, fetchSingleOrder);


/**
 * ! Check whether user has already purchased this product
 */
router.get("/check-purchase/paid", checkUser, checkOrderPurchase);




export default router;