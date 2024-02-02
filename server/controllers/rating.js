import Rating from "../models/Rating.js";

/**
 * ! POST
 * ! Create Product Rating
 */
const createRating = async (req, res) => {
    try {
        const { userId, productId, userName, rating, comment } = req.body;
        /** check if user already rated this product */
        const existingRating = await Rating.findOne({ user: userId, product: productId });

        if (existingRating) {
            return res.status(400).json({ error: 'You already rated this product!' });
        }

        await Rating.create({
            user: userId,
            product: productId,
            rating,
            comment,
            userName
        });

        return res.status(200).json("Thank you rating this product!");

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


/**
 * !GET 
 * ! Fetching single product ratings
 */
const fetchSingleProductRating = async (req, res) => {
    try {
        const { productId } = req.params;

        const ratings = await Rating.find({ product: productId }).sort({createdAt: -1});

        return res.status(200).json(ratings);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


export {
    createRating,
    fetchSingleProductRating
}