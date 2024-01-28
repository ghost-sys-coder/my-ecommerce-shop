import { Router } from "express";
import { addToCart, deleteAllProductsCartForUser, deleteProductCart, fetchCartProducts, updateProductCart } from "../controllers/cart.js";
import { checkUser, requireAuthToken } from "../middleware/authentication.js";

const router = Router();

/**
 * ! Add to product cart
 */
router.post("/add-to-cart/:id", requireAuthToken, addToCart)


/**
 * ? Fetch Products from cart
 */
router.get("/:id", checkUser, fetchCartProducts);


/**
 * ! Update Product Carts
 */
router.put("/update/:id", checkUser, updateProductCart);

/**
 * ? delete Product Cart Item
 */
router.delete("/delete/:userId/:id", checkUser, deleteProductCart);

/**
 * Delete all cart products for a user
 */
router.delete("/delete/all/:userId/delete-all", deleteAllProductsCartForUser);




export default router;