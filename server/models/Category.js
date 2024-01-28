import { Schema, model } from "mongoose";

const CategorySchema = new Schema({
    category: {
        type: String,
        required: [true, 'main category required!'],
        unique: [true, 'Category must be unique']
    },
    description: {
        type: String,
        required: [true, 'Category Description is required!']
    },
    imgUrl: {
        type: String,
        required: [true, 'Category Image required!']
    },
    parentCategory: {
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true });


const Category = model('Category', CategorySchema);

export default Category;