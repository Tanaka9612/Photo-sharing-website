import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { caption, album, visibility } = req.body;
        if (!req.file) {
            return res.status(400).json({
                message: "Please upload an image."
            });
        }
        const imageUrl = `/uploads/${req.file.filename}`;
        const post = await Post.create({
            user: req.user.id,
            imageUrl,
            caption: caption || "",
            album: album || null,
            visibility: visibility || "public"
        });
        res.status(201).json({
            message: "Post created successfully",
            post
        });
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({
            message: error.message || "Server error while creating post."
        });
    }
};
// LIKE / UNLIKE POST
export const likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        // Get the currently logged-in user
        const userId = req.user.id;
        // Check whether the user already liked the post
        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId.toString()
        );
        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            post.likes.push(userId);
        }
        await post.save();
        res.status(200).json({
            message: alreadyLiked
                ? "Post unliked"
                : "Post liked",
            liked: !alreadyLiked,
            likesCount: post.likes.length
        });
    } catch (error) {
        console.error("Like post error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

// ADD COMMENT
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;

        if (typeof text !== "string" || !text.trim()) {
            return res.status(400).json({
                message: "Comment text is required."
            });
        }

        if (text.trim().length > 500) {
            return res.status(400).json({
                message: "Comments must be 500 characters or fewer."
            });
        }

        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found."
            });
        }

        post.comments.push({
            user: req.user.id,
            text: text.trim()
        });
        await post.save();

        const commentIndex = post.comments.length - 1;
        await post.populate(`comments.${commentIndex}.user`, "username profilePicture");

        return res.status(201).json({
            message: "Comment added successfully.",
            comment: post.comments[commentIndex]
        });
    } catch (error) {
        console.error("Add comment error:", error);
        return res.status(500).json({
            message: "Failed to add comment."
        });
    }
};

// user posts for profile page
export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user.id })
            .populate("comments.user", "username profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Get user posts error:", error);
        res.status(500).json({
            message: "Failed to fetch user posts."
        });
    }
};
// GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .sort({ createdAt: -1 });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            message: "Failed to retrieve posts"
        });
    }
};
