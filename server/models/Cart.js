import { Schema, model } from "mongoose";

const CartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User required!']
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product required!']
    },
    price: {
        type: Number,
        required: [true, 'Price is required!']
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required!']
    },
    colors: {
        type: [String]
    },
    sizes: {
        type: [String]
    }
}, { timestamps: true });

const Cart = model('Cart', CartSchema);

export default Cart;