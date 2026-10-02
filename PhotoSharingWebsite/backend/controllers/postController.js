import Post from "../models/Post.js";

export const createPost = async (req, res) => {

    try {

        const {
            imageUrl,
            caption,
            album,
            visibility
        } = req.body;

        const post = await Post.create({
            user: req.user.id,
            imageUrl,
            caption,
            album: album || null,
            visibility: visibility || "public"
        });

        res.status(201).json(post);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};