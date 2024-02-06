import { Router } from "express";
import { checkUser } from "../middleware/authentication.js";
import { updateOrderToPaid } from "../controllers/paypal.js";

const router = Router();


/**
 * !  PUT
 * ! Update order paid to true
 */
router.put("/:id/pay", checkUser, updateOrderToPaid);


export default router;