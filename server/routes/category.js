import { Router } from "express";
import { FetchCategories } from "../controllers/category.js";

const router = Router();

/**
 * ! Fetch Categories
 */
router.get("/", FetchCategories);



export default router;
