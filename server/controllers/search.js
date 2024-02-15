import Product from "../models/Product.js";
import { mongoConnect } from "../database/mongoose.js";

/**
 * ! Search Products
 */
const searchProducts = async (req, res) => {
    await mongoConnect();
    try {
        const query = req.query.q;
        console.log(typeof (query), query);


        if (!query) {
            return res.status(400).json({error: 'Invalid Search Query!'})
        }

        // const results = await Product.find({$text: {$search: query}})
        const results = await Product.find({ title: { "$regex": query, "$options": "i" } });

        console.log("MongoDB query:", { title: { "$regex": query, "$options": "i" } })

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


export { searchProducts };