import { Router } from "express";
import { cashOnDelivery } from "../controllers/cashOnDelivery.js";
import { checkUser } from "../middleware/authentication.js";

const router = Router();


/**
 * ! Pay with Cash On Delivery
 */
router.put("/:id", checkUser, cashOnDelivery);


export default router;