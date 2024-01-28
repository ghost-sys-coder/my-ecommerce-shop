import Product from "../models/Product.js";

/**
 * ! Fetch Featured Products
 */
const fetchProducts = async (req, res) => {
    try {
        const products = await Product.find({isFeatured: true}).populate('category').sort({createdAt: -1}); 
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


/**
 * ? Fetch Products by categories
 */
const fetchProductsByCategories = async (req, res) => {
    try {
        const { categoryId } = req.params;

        /** query products with the specified category from mongodb  */
        const products = await Product.find({category: categoryId}).populate("category");

        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/** 
 * ! fetch a single product
*/
const fetchProduct = async (req, res) => {
    const { id } = req.params;
    try {
        /** query for the product */
        const product = await Product.findById(id).populate("category");
        console.log({product})
        return res.status(200).json(product);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ? Fetch All Products
 */
const fetchAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}



export {
    fetchProducts,
    fetchProduct,
    fetchProductsByCategories,
    fetchAllProducts,
}