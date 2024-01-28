import { Router } from "express";
import { searchProducts } from "../controllers/search.js"; 

const router = Router();

/**
 * ! Search products
 */

router.get("/products", searchProducts);

export default router;

