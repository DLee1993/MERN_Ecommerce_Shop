// - This is used to import sample data (users + products)
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/UserModel.js";
import Product from "./models/ProductModel.js";
import Order from "./models/OrderModel.js";
import connectDatabase from "./config/db.js";

dotenv.config();
connectDatabase();

const importData = async () => {
    try {
        // - clear out all fields
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // - insert all users
        const createdUsers = await User.insertMany(users);

        // - find the admin user from the createdUsers array
        const adminUser = createdUsers[0]._id;

        // - add admin user to all products
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // - add all the sample products
        await Product.insertMany(sampleProducts);

        console.log("Data imported".green.inverse);
        process.exit();
    } catch (error) {
        console.error(error.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        // - clear out all fields
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed".red.inverse);
        process.exit();
    } catch (error) {
        console.error(error.red.inverse);
        process.exit(1);
    }
};

process.argv[2] === "-d" ? destroyData() : importData();
