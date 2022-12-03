import mongoose, { connect } from "mongoose";

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected`.bgCyan.bold);
    } catch (error) {
        console.log(`Error: ${error}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDatabase;
