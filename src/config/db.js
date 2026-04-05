import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using the URI from environment variables.
 * Explicitly sets the database name to 'financeDB'.
 */
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "financeDB"
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.error("Please ensure your IP address is whitelisted in MongoDB Atlas or check your credentials.");
        process.exit(1);
    }
};