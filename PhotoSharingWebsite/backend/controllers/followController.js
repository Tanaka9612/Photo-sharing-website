
import mongoose from "mongoose";
import User from "../models/User.js";

const getCurrentUserId = (req) => req.user?._id || req.user?.id;

// POST /api/users/:userId/follow
export const toggleFollow = async (req, res) => {
    try {
        const currentUserId = getCurrentUserId(req);
        const targetUserId = req.params.userId;

        if (
            !mongoose.isValidObjectId(currentUserId) ||
            !mongoose.isValidObjectId(targetUserId)
        ) {
            return res.status(400).json({
                message: "Invalid user ID."
            });
        }

        if (currentUserId.toString() === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself."
            });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const alreadyFollowing = currentUser.following.some(
            (id) => id.toString() === targetUserId
        );

        if (alreadyFollowing) {
            currentUser.following.pull(targetUser._id);
            targetUser.followers.pull(currentUser._id);
        } else {
            currentUser.following.addToSet(targetUser._id);
            targetUser.followers.addToSet(currentUser._id);
        }

        await Promise.all([
            currentUser.save(),
            targetUser.save()
        ]);

        return res.status(200).json({
            message: alreadyFollowing ? "User unfollowed." : "User followed.",
            following: !alreadyFollowing,
            followersCount: targetUser.followers.length
        });
    } catch (error) {
        console.error("Follow error:", error);

        return res.status(500).json({
            message: "Failed to update follow status."
        });
    }
};
