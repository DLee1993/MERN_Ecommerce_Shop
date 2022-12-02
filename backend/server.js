const express = require("express"),
    app = express(),
    products = require("./data/products");

app.get("/", (req, res) => {
    res.send("Api is running");
});

app.get("/products", (req, res) => {
    res.json(products)
});

app.get("/products/:id", (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    res.json(product)
});

app.listen(5000, console.log("Server running on port 5000"));
