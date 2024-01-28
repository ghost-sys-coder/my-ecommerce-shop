import { Router } from "express";
import { checkUser } from "../middleware/authentication.js";
import { getMoMoToken, payViaMomo } from "../controllers/mtnpay.js";


const router = Router();

/**
 * ! POST MOMO TOKEN
 */
router.post("/get-token", checkUser, getMoMoToken);


/**
 * ? POST PAY VIA MOMO
 */
router.post("/pay-momo", checkUser, payViaMomo);

export default router;
