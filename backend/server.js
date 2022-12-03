import express from "express";
import dotenv from 'dotenv'; 
import connectDatabase from "./config/db.js";
import products from './data/products.js'   
import colors from 'colors'; 
const PORT = process.env.PORT || 5000; 

dotenv.config(); 
const app = express(); 
connectDatabase()

app.get("/", (req, res) => {
    res.send("Api is running");
});

app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:id", (req, res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(product);
});

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgYellow.bold));
