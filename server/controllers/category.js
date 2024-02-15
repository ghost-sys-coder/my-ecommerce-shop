import Category from "../models/Category.js";
import { mongoConnect } from "../database/mongoose.js";
/**
 * ! Fetch Categories
 */
const FetchCategories = async (req, res) => {
    await mongoConnect();
    try {
        const categories = await Category.find({}).populate("parentCategory");
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
};



export {
    FetchCategories
}