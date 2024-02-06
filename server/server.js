import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import {mongoConnect} from "./database/mongoose.js";


/** import routes */
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/products.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/orders.js";
import searchRoutes from "./routes/search.js";
import mtnPayRoutes from "./routes/mtnpay.js";
import cashOnDeliveryPayRoutes from "./routes/cashOnDelivery.js";
import productRatingRoutes from "./routes/rating.js";
import paypalRoutes from "./routes/paypal.js";

/** import auth middleware */
import { requireAuthToken, checkUser, checkAdmin } from "./middleware/authentication.js";

/** setup env file configuration */
dotenv.config({ path: './config/config.env' });

/** initialize express application */
const app = express();
const port = process.env.PORT || 8000;

/** logging files and actions */
if (process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

/** application middleware configuration */
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET']
}));
app.use(cookieParser());


/** running application routes */
app.use("/api/auth/", authRoutes);
app.use("/api/categories/", categoryRoutes);
app.use("/api/products/", productRoutes);
app.use("/api/cart/", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/search', searchRoutes);
app.use("/api/mtn/", mtnPayRoutes);
app.use("/api/cash-on-delivery", cashOnDeliveryPayRoutes);
app.use("/api/rating", productRatingRoutes);
app.use("/api/paypal", paypalRoutes);

/** send paypal client id to the frontend */
app.get('/api/config/paypal', (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

/** running express application */
app.listen(port, async () => {
    await mongoConnect();
    console.log(`Server is running on port: ${port}`)
})