import Product from "../models/ProductModel.js";

// - Description ( Fetch all products in the database )
// - Route ( /products )
// - Request Type ( GET )
// - Authentication ( Public route - no authentication needed )
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
    }
};

// - Description ( Fetch a single product from the database, search based on id )
// - Route ( /products/:id )
// - Request Type ( GET )
// - Authentication ( Public route - no authentication needed )
const getProductById = async (req, res) => {
    try {
        const productByID = await Product.findById(req.params.id);

        productByID ? res.json(productByID) : res.status(404).json({ msg: "Product not found" });
    } catch (error) {
        console.error(error);
    }
};

export { getProducts, getProductById };
