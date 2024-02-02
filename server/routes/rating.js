import { Router } from "express";
import { checkUser } from "../middleware/authentication.js";
import { createRating, fetchSingleProductRating } from "../controllers/rating.js";

const router = Router();

/**
 * ! POST
 * ! Create a new product rating
 */
router.post('/create', checkUser, createRating);


/**
 * ? GET
 * ? Fetch ratings for a single product
 */
router.get("/:productId", fetchSingleProductRating);


export default router;
