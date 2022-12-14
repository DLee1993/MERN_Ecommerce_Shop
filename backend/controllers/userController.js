import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

// - Description ( Authenticate the user and generate a token  )
// - Route ( /users/login )
// - Request Type ( POST )
// - Authentication ( Public route - no authentication needed )
const authUser = async (req, res) => {
    try {
        // - destructure email and password from req
        const { email, password } = req.body;
        // - find the user by the email from req
        const user = await User.findOne({ email });

        // - check to see if the user exists
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401);
            res.json({ Error: "Invalid Credentials" });
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        console.error(error);
    }
};

// - Description ( Register a new user )
// - Route ( /register )
// - Request Type ( POST )
// - Authentication ( Public route - no authentication needed )
const registerUser = async (req, res) => {
    try {
        // - destructure name, email and password from req
        const { name, email, password } = req.body;

        // - check to see if the user already exists
        const userExists = await User.findOne({ email });

        // - if the user exits
        if (userExists) {
            res.status(400);
            res.json({ Error: "User already exists" });
            throw new Error("User already exists");
        }

        // - if the user doesn't exist, create the new user
        const newUser = await User.create({
            name,
            email,
            password,
        });

        // - if the newUser exists we need to send the json data
        if (newUser) {
            res.status(201);
            res.json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                token: generateToken(newUser._id),
            });
        } else {
            res.status(400);
            res.json({ Error: "Invalid user data" });
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error(error);
    }
};

// - Description ( Get the user profile)
// - Route ( /users/profile )
// - Request Type ( GET )
// - Authentication ( Private route - authentication needed )
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    try {
        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            });
        } else {
            res.status(401);
            res.json({ msg: "User not found" });
            throw new Error("User not found");
        }
    } catch (error) {
        console.error(error);
    }
};

export { authUser, registerUser, getUserProfile };
