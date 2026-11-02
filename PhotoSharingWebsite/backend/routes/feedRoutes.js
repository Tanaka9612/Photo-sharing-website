
import express from "express";
import { getFeed } from "../controllers/feedController.js";
import { optionalAuth } from "../middleware/authMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/feed
router.get("/",protect, optionalAuth, getFeed);

export default router;
