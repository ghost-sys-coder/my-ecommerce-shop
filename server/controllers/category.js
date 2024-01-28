import Category from "../models/Category.js";

/**
 * ! Fetch Categories
 */
const FetchCategories = async (req, res) => {
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