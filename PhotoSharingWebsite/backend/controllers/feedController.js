
import Post from "../models/Post.js";

export const getFeed = async (req, res) => {
    try {
        const currentUserId = req.user?.id || req.user?._id;

        const posts = await Post.find()
            .populate("user", "username profilePicture followers")
            .populate("comments.user", "username profilePicture")
            .sort({ createdAt: -1 });

        const postsWithFollowStatus = posts.map((post) => {
            const postObject = post.toObject();
            const owner = postObject.user;

            postObject.isFollowing = Boolean(
                currentUserId &&
                owner?.followers?.some(
                    (followerId) =>
                        followerId.toString() === currentUserId.toString()
                )
            );

            // Do not expose the owner's entire followers list.
            if (owner) {
                delete owner.followers;
            }

            return postObject;
        });

        return res.status(200).json(postsWithFollowStatus);
    } catch (error) {
        console.error("Error fetching feed:", error);

        return res.status(500).json({
            message: "Failed to fetch posts",
            error: error.message
        });
    }
};
