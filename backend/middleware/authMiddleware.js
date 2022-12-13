import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const protect = async (req, res, next) => {
    let token;

    // - check to see if there is a token and the value starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        // - If the token is found
        try {
            // - set token variable to the token available
            token = req.headers.authorization.split(" ")[1];
            // - use jwt to verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password'); 
            next();
        } catch (error) {
            console.error(error);
        }
    } else {
        // - if the token is not found
        res.status(401).json({ msg: "Not Authorised" });
    }
};

export { protect };
