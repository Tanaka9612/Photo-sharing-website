import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
    createPost,
    likePost
} from "../controllers/postController.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Create a post
router.post(
    "/",
    protect,
    upload.single("image"),
    createPost
);

// Like / unlike a post
router.post(
    "/:id/like",
    protect,
    likePost
);

export default router;