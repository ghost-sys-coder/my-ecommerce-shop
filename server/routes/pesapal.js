import { Router } from "express";
import { requestPesapalAuthToken } from "../controllers/pesapal.js";
import { checkUser } from "../middleware/authentication.js";

const router = Router();

/**
 * ! Request Pesapal Auth Token
 */
router.get("/auth-token", requestPesapalAuthToken);

export default router;
