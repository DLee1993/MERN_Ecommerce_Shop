import User from "../models/UserModel.js";

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
                token: null,
            });
        } else {
            res.status(401);
            res.json({Error: 'Invalid Credentials'})
            throw new Error("Invalid Credentials");
        }
    } catch (error) {
        console.error(error)
    }
};

export { authUser };
