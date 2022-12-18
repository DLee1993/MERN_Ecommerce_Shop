import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();
connectDatabase();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Api is running");
});

// - this is using seperate routes ( productRoutes.js )
// - all of these routes will start will /products
app.use("/products", productRoutes);

// - this is using seperate routes ( userRoutes.js )
// - all of these routes will start will /users
app.use("/users", userRoutes);


// - this is using seperate routes ( orderRoutes.js )
// - all of these routes will start will /users
app.use("/orders", orderRoutes);


app.get("/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

app.use(notFound);
app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold)
);
