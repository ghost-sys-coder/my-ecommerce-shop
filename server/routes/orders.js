import { Router } from "express";
import { checkUser } from "../middleware/authentication.js";
import { createOrder, fetchUserOrders, updateOrderToPaid,  } from "../controllers/orders.js";


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




export default router;