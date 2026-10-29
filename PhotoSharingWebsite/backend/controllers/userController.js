import User from "../models/User.js";
import Post from "../models/Post.js";
import Collection from "../models/Collection.js";

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const [postsCount, likesResult, collectionsCount] = await Promise.all([
            Post.countDocuments({ user: user._id }),
            Post.aggregate([
                { $match: { user: user._id } },
                {
                    $group: {
                        _id: null,
                        likesReceived: {
                            $sum: { $size: { $ifNull: ["$likes", []] } }
                        }
                    }
                }
            ]),
            Collection.countDocuments({ user: user._id })
        ]);

        res.status(200).json({
            ...user.toObject(),
            postsCount,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            collectionsCount,
            likesReceived: likesResult[0]?.likesReceived ?? 0
        });

    } catch (error) {
        console.error("Get user error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


export const updateMe = async (req, res) => {
    try {

        const {
            username,
            bio,
            profilePicture
        } = req.body;


        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }


        // Update username if provided
        if (username !== undefined) {
            user.username = username;
        }


        // Update bio if provided
        if (bio !== undefined) {
            user.bio = bio;
        }


        // Update profile picture if provided
        if (profilePicture !== undefined) {
            user.profilePicture = profilePicture;
        }


        const updatedUser = await user.save();


        res.status(200).json({
            message: "Profile updated successfully",

            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profilePicture: updatedUser.profilePicture,
                bio: updatedUser.bio,
                role: updatedUser.role
            }
        });

    } catch (error) {

        console.error("Update profile error:", error);

        res.status(500).json({
            message: "Server error updating profile"
        });
    }
};