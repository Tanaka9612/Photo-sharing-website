
import { useState } from "react";

function Post({ post }) {
    const token = localStorage.getItem("token");
    const [liked, setLiked] = useState(
        post.liked || false
    );
    const [likes, setLikes] = useState(
        post.likesCount || post.likes?.length || 0
    );
    const [likeLoading, setLikeLoading] = useState(false);
    const handleLike = async () => {
        // Prevent multiple requests
        if (likeLoading) {
            return;
        }
        // Check if user is logged in
        if (!token) {
            alert("Please log in to like a post.");
            return;
        }
        setLikeLoading(true);
        try{
            const response = await fetch(
                `http://localhost:5000/api/posts/${post._id}/like`,
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );
            const data = await response.json();
            if (response.ok) {
                // Update the button
                setLiked(data.liked);
                // Update number of likes
                setLikes(data.likesCount);
            } else {
                alert(
                    data.message ||
                    "Could not like post."
                );
            }
        } catch (error) {
            console.error(
                "Like error:",
                error
            );
            alert(
                "Could not connect to the server."
            );
        } finally {
            setLikeLoading(false);
        }
    };
    return (
        <div className="post">
            {/* Post image */}
            <div className="post-image">
                <img
                    src={post.image}
                    alt={post.caption}
                />
            </div>
            {/* Comments */}
            <div className="post-comments">
                {post.comments.map(
                    (comment, index) => (
                        <div
                            key={index}
                            className="comments"
                        >
                            <strong>
                                {comment.username}
                            </strong>
                            <p>
                                {comment.text}
                            </p>
                        </div>
                    )
                )}
                <div className="post-actions">
                    <button
                        type="button"
                        onClick={handleLike}
                        disabled={likeLoading}
                        className={
                            liked
                                ? "liked"
                                : "like-button"
                        }
                    >
                        {liked ? "♥" : "♡"}
                    </button>
                    <span>
                        {likes}
                        {" "}
                        {likes === 1
                            ? "Like"
                            : "Likes"}
                    </span>
                </div>
                {/* Comment form */}
                <div className="comment-form">
                    <form>
                        <input
                            type="text"
                            placeholder="Write a comment..."
                        />
                        <button type="submit">
                            Comment
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Post;