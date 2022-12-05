import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
const PORT = process.env.PORT || 5000;

dotenv.config();
const app = express();
connectDatabase();

app.get("/", (req, res) => {
    res.send("Api is running");
});

// - this is using seperate routes ( productRoutes.js )
// - all of these routes will start will /products
app.use("/products", productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold)
);
