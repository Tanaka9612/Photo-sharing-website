import express from "express";
import {
    addComment,
    createPost,
    getAllPosts,
    getUserPosts,
    likePost
} from "../controllers/postController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Get posts from all users
router.get("/", getAllPosts);

// Get posts belonging to the logged-in user
router.get("/user", protect, getUserPosts);

// Create a post
router.post("/", protect, upload.single("image"), createPost);

// Like a post
router.post("/:id/like", protect, likePost);

// Add a comment to a post
router.post("/:id/comments", protect, addComment);

export default router;