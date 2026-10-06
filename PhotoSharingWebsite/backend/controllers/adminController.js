import User from "../models/User.js";
import Post from "../models/Post.js";


// ==============================
// GET ALL USERS
// ==============================

export const getAllUsers = async (req, res) => {

    try {

        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.status(200).json(users);

    } catch (error) {

        console.error("Get users error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==============================
// GET ALL POSTS
// ==============================

export const getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("user", "username email profilePicture")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        console.error("Get posts error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==============================
// DELETE USER
// ==============================

export const deleteUser = async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Don't allow admin to delete themselves
        if (user._id.toString() === req.user.id) {
            return res.status(400).json({
                message: "You cannot delete your own admin account"
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (error) {

        console.error("Delete user error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// ==============================
// DELETE POST
// ==============================

export const deletePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Post deleted successfully"
        });

    } catch (error) {

        console.error("Delete post error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};