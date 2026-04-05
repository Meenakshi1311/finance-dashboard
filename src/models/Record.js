import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: [true, "Amount is required"],
        min: [0, "Amount cannot be negative"]
    },
    type: {
        type: String,
        required: [true, "Type is required"],
        enum: ["income", "expense"]
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    notes: {
        type: String,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author is required"]
    }
}, { timestamps: true });

export default mongoose.model("Record", recordSchema);