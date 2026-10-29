import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
    getMe,
    updateMe
} from "../controllers/userController.js";
import { toggleFollow } from "../controllers/followController.js";
const router = express.Router();

router.post("/:userId/follow", protect, toggleFollow);
router.get("/me", protect, getMe);

router.put("/me", protect, updateMe);


export default router;