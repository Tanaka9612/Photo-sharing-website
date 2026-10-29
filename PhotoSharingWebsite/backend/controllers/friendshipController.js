
import mongoose from "mongoose";
import Friendship from "../models/Friendship.js";
import User from "../models/User.js";

const getCurrentUserId = (req) => {
    return req.user?._id || req.user?.id;
};

// GET /api/friends
export const getFriends = async (req, res) => {
    try {
        const userId = getCurrentUserId(req);

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(401).json({ message: "Invalid user token." });
        }

        const friendships = await Friendship.find({
            status: "accepted",
            $or: [
                { requester: userId },
                { recipient: userId }
            ]
        })
            .populate("requester", "username profilePicture bio")
            .populate("recipient", "username profilePicture bio");

        const friends = friendships.map((friendship) =>
            friendship.requester._id.toString() === userId.toString()
                ? friendship.recipient
                : friendship.requester
        );

        return res.status(200).json({ friends });
    } catch (error) {
        console.error("Get friends error:", error);
        return res.status(500).json({ message: "Failed to retrieve friends." });
    }
};

// GET /api/friends/requests
export const getFriendRequests = async (req, res) => {
    try {
        const userId = getCurrentUserId(req);

        if (!mongoose.isValidObjectId(userId)) {
            return res.status(401).json({ message: "Invalid user token." });
        }

        const requests = await Friendship.find({
            recipient: userId,
            status: "pending"
        })
            .populate("requester", "username profilePicture bio")
            .sort({ createdAt: -1 });

        return res.status(200).json({ requests });
    } catch (error) {
        console.error("Get friend requests error:", error);
        return res.status(500).json({
            message: "Failed to retrieve friend requests."
        });
    }
};

// POST /api/friends/request/:userId
export const sendFriendRequest = async (req, res) => {
    try {
        const requesterId = getCurrentUserId(req);
        const recipientId = req.params.userId;

        if (
            !mongoose.isValidObjectId(requesterId) ||
            !mongoose.isValidObjectId(recipientId)
        ) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        if (requesterId.toString() === recipientId) {
            return res.status(400).json({
                message: "You cannot send a friend request to yourself."
            });
        }

        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(404).json({ message: "User not found." });
        }

        const existing = await Friendship.findOne({
            $or: [
                { requester: requesterId, recipient: recipientId },
                { requester: recipientId, recipient: requesterId }
            ]
        });

        if (existing) {
            return res.status(409).json({
                message: existing.status === "accepted"
                    ? "You are already friends."
                    : "A friend request already exists.",
                status: existing.status
            });
        }

        const friendship = await Friendship.create({
            requester: requesterId,
            recipient: recipientId,
            status: "pending"
        });

        return res.status(201).json({
            message: "Friend request sent.",
            friendship
        });
    } catch (error) {
        console.error("Send friend request error:", error);

        if (error.code === 11000) {
            return res.status(409).json({
                message: "A relationship already exists."
            });
        }

        return res.status(500).json({
            message: "Failed to send friend request."
        });
    }
};

// PUT /api/friends/accept/:userId
// userId is the ID of the person who sent the request.
export const acceptFriendRequest = async (req, res) => {
    try {
        const recipientId = getCurrentUserId(req);
        const requesterId = req.params.userId;

        if (
            !mongoose.isValidObjectId(recipientId) ||
            !mongoose.isValidObjectId(requesterId)
        ) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        const friendship = await Friendship.findOneAndUpdate(
            {
                requester: requesterId,
                recipient: recipientId,
                status: "pending"
            },
            { $set: { status: "accepted" } },
            { new: true }
        )
            .populate("requester", "username profilePicture")
            .populate("recipient", "username profilePicture");

        if (!friendship) {
            return res.status(404).json({
                message: "Pending friend request not found."
            });
        }

        return res.status(200).json({
            message: "Friend request accepted.",
            friendship
        });
    } catch (error) {
        console.error("Accept friend request error:", error);
        return res.status(500).json({
            message: "Failed to accept friend request."
        });
    }
};

// DELETE /api/friends/:userId
export const removeFriend = async (req, res) => {
    try {
        const currentUserId = getCurrentUserId(req);
        const otherUserId = req.params.userId;

        if (
            !mongoose.isValidObjectId(currentUserId) ||
            !mongoose.isValidObjectId(otherUserId)
        ) {
            return res.status(400).json({ message: "Invalid user ID." });
        }

        const friendship = await Friendship.findOneAndDelete({
            $or: [
                { requester: currentUserId, recipient: otherUserId },
                { requester: otherUserId, recipient: currentUserId }
            ]
        });

        if (!friendship) {
            return res.status(404).json({
                message: "Friendship or friend request not found."
            });
        }

        return res.status(200).json({
            message: "Friendship or friend request removed."
        });
    } catch (error) {
        console.error("Remove friend error:", error);
        return res.status(500).json({
            message: "Failed to remove friend."
        });
    }
};
