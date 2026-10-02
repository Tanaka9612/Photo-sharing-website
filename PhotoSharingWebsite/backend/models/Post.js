import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        text: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500
        }
    },

    {
        timestamps: true
    }
);

const postSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        album: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Album",
            default: null
        },

        imageUrl: {
            type: String,
            required: true
        },

        caption: {
            type: String,
            maxlength: 1000,
            default: ""
        },

        visibility: {
            type: String,
            enum: ["public", "friends", "private"],
            default: "public"
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        comments: [commentSchema]
    },

    {
        timestamps: true
    }
);

const Post = mongoose.model("Post", postSchema);

export default Post;