import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
    {
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true
        },

        reason: {
            type: String,
            required: true,
            maxlength: 500
        },

        status: {
            type: String,
            enum: ["pending", "reviewed", "dismissed"],
            default: "pending"
        }
    },

    {
        timestamps: true
    }
);

const Report = mongoose.model("Report", reportSchema);

export default Report;