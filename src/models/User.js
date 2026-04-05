import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    role: {
        type: String,
        enum: ["viewer", "analyst", "admin"],
        default: "viewer"
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
});

export default mongoose.model("User", userSchema);