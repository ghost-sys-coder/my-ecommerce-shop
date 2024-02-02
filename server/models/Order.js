import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    shippingAddress: {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobileNo: {
            type: String,
            required: true
        },
        houseNo: String,
        streetNo: String,
        landMark: String,
        address: {
            type: String
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true,
            default: null
        },
        postalCode: String,
    },
    status: {
        type: String,
        enum: ['Order Placed', 'Processing', 'Shipped', 'Delivered'],
        default: 'Order Placed'
    },
    paymentMethod: {
        type: String,
        enum: ['Paypal', 'Cash On Delivery', 'Airtel Money', 'MTN Money'],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Complete'],
        default: 'Pending'
    },
    totalAmount: {
        type: Number,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: {
        type: Date,
    },
    paymentResult: {
            id: {
                type: String,
            },
            status: {
                type: String,
            },
            updatedTime: {
                type: String,
            },
            emailAddress: {
                type: String,
            }
    },
    cashOnDelivery: {
        type: Boolean,
       default: false, 
    }
}, { timestamps: true });


const Order = model("Order", OrderSchema);

export default Order;
