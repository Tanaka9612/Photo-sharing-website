import express from "express";

import {
    getFriends,
    getFriendRequests,
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend
} from "../controllers/friendshipController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getFriends);

router.get("/requests", protect, getFriendRequests);

router.post("/request/:userId", protect, sendFriendRequest);

router.put("/accept/:userId", protect, acceptFriendRequest);

router.delete("/:userId", protect, removeFriend);

export default router;