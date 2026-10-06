import Post from "../models/Post.js";

// CREATE POST
export const createPost = async (req, res) => {
    try{
        const{
            imageUrl,
            caption,
            album,
            visibility
        } = req.body;
        
       // Create URL for the image
        const imageUrl =`/uploads/${req.file.filename}`;
        const post = await Post.create({
            user: req.user.id,
            imageUrl: imageUrl,
            caption: caption || "",
            album: album || null,
            visibility: visibility || "public"
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Create post error:", error);
        res.status(500).json({
            message: error.message
        });
    }
};

// LIKE / UNLIKE POST
export const likePost = async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                message: "Post not found"
            });
        }
        // Get the currently logged-in user
        const userId = req.user.id;


        // Check whether the user already liked the post
        const alreadyLiked = post.likes.some(
            (id) => id.toString() === userId.toString()
        );
        if (alreadyLiked) {
            post.likes = post.likes.filter(
                (id) => id.toString() !== userId.toString()
            );
        } else {
            post.likes.push(userId);

        }
        await post.save();
        res.status(200).json({
            message: alreadyLiked
                ? "Post unliked"
                : "Post liked",
            liked: !alreadyLiked,
            likesCount: post.likes.length
        });
    } catch (error) {
        console.error("Like post error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};