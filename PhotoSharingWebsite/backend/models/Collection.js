import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
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
        posts: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },
    {
        timestamps: true
    }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;
