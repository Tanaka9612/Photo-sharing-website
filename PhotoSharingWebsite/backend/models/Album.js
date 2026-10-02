import mongoose from "mongoose";

const albumSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100
        },

        description: {
            type: String,
            maxlength: 500,
            default: ""
        },

        coverImage: {
            type: String,
            default: ""
        }
    },

    {
        timestamps: true
    }
);

const Album = mongoose.model("Album", albumSchema);

export default Album;