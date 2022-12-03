import mongoose, { connect } from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected`);
    } catch (error) {
        console.log(`Error: ${error}`);
        process.exit(1);
    }
};

export default connectDatabase;
