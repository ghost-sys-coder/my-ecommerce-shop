import { Router } from "express";
import { fetchAllProducts, fetchProduct, fetchProducts, fetchProductsByCategories } from "../controllers/products.js";

const router = Router();

/**
 * ! Fetch Featured Products
 */
router.get("/", fetchProducts);


/**
 * ? Fetch Products by categories
 */
router.get("/:categoryId", fetchProductsByCategories);


/**
 * ! Fetch Single Product
 */
router.get("/:title/:id", fetchProduct);

/**
 * ? Fetch All Products
 */
router.get("/get/all/products", fetchAllProducts);



export default router;

