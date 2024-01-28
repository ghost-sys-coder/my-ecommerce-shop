import Cart from "../models/Cart.js";
import Product from "../models/Product.js";


/**
 * ! Add product to cart
 */
const addToCart = async (req, res) => {
    try {
        const { id } = req.params;

        const { userId, productId, quantity, price, colors, sizes } = req.body;

        /** check if product exists */
        const product = await Product.findById(id);
        if (!product) {
            return res.status(400).json({error: 'Product not found!'})
        }

        /** check if there is an existing cart for this product by the same user */
        const checkExistingCart = await Cart.findOne({ user: userId, product: productId });
        if (checkExistingCart) {
            checkExistingCart.price = price;
            checkExistingCart.quantity = quantity;
            checkExistingCart.colors = colors;
            checkExistingCart.sizes = sizes;
            await checkExistingCart.save();
            return res.status(200).json(checkExistingCart)
        }


        /** create new cart if there is no existing cart for this product by the same user */
        const cart = await Cart.create({
            user: userId,
            product: productId,
            quantity,
            price,
            colors,
            sizes
        });
        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ? Fetch cart products for an individual user
 */
const fetchCartProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Cart.find({user: id}).populate("product");
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/**
 * ! Update Product Cart
 */
const updateProductCart = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCart = await Cart.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedCart)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}

/** 
 * ?Delete Product Cart Item 
*/
const deleteProductCart = async (req, res) => {
    try {
        const { id, userId } = req.params;

        await Cart.findByIdAndDelete(id);

        res.status(200).json('Product Deleted!')
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


/**
 * ! Delete the Entire cart
 */
const deleteAllProductsCartForUser = async (req, res) => {
    console.log('Run Check')
    try {
        const { userId, id } = req.params;
        await Cart.deleteMany({ user: userId });
        res.status(200).json('All products deleted!')
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message})
    }
}


export {
    addToCart,
    fetchCartProducts,
    updateProductCart,
    deleteProductCart,
    deleteAllProductsCartForUser
}
