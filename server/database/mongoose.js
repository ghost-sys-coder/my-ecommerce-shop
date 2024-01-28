import mongoose from "mongoose";
import User from "../models/User.js";

mongoose.set("strictQuery", false);

/**
 * ! Connect to MongoDB
 */

export const mongoConnect = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB is connected and running: ${dbConnection.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

/**
 * ? Script to run model updates
 */
export const updateModelFields = async () => {
    try {
        const result = await User.updateMany({}, {
            $set: {
                resetToken: undefined,
                resetTokenExpiration: undefined
            }
        });
        console.log(`${result.nModified} users(s) updated successfully!`)
    } catch (error) {
        console.log("Error updating existing users!",error);
    }
}