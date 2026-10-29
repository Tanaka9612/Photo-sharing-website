
import { useState } from "react";
import { API_URL, assetUrl } from "../config/api";

function Post({ post }) {
    const token = localStorage.getItem("token");

    const [liked, setLiked] = useState(post.liked || false);
    const [likes, setLikes] = useState(
        post.likesCount || post.likes?.length || 0
    );
    const [likeLoading, setLikeLoading] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [commentText, setCommentText] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);
    const [commentError, setCommentError] = useState("");
    const [collections, setCollections] = useState([]);
    const [showCollections, setShowCollections] = useState(false);
    const [collectionsLoading, setCollectionsLoading] = useState(false);
    const [collectionError, setCollectionError] = useState("");

const creatorId = post.user?._id;

const [following, setFollowing] = useState(
    post.isFollowing ?? false
);
const [followLoading, setFollowLoading] = useState(false);

const handleFollow = async () => {
    if (!token) {
        alert("Please log in to follow users.");
        return;
    }

    if (!creatorId || followLoading) return;

    setFollowLoading(true);

    try {
        const response = await fetch(
            `${API_URL}/users/${creatorId}/follow`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Could not update follow status.");
            return;
        }

        setFollowing(data.following);
    } catch (error) {
        console.error("Follow error:", error);
        alert("Could not connect to the server.");
    } finally {
        setFollowLoading(false);
    }
};


    const handleLike = async () => {
        if (likeLoading) return;

        if (!token) {
            alert("Please log in to like a post.");
            return;
        }

        setLikeLoading(true);

        try {
            const response = await fetch(
                `${API_URL}/posts/${post._id}/like`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok) {
                setLiked(data.liked);
                setLikes(data.likesCount);
            } else {
                alert(data.message || "Could not like post.");
            }
        } catch (error) {
            console.error("Like error:", error);
            alert("Could not connect to the server.");
        } finally {
            setLikeLoading(false);
        }
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        const text = commentText.trim();
        if (!text || commentLoading) return;

        if (!token) {
            setCommentError("Please log in to comment.");
            return;
        }

        setCommentLoading(true);
        setCommentError("");
        try {
            const response = await fetch(
                `${API_URL}/posts/${post._id}/comments`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ text }),
                }
            );
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Could not add comment.");
            }

            setComments((currentComments) => [...currentComments, data.comment]);
            setCommentText("");
        } catch (error) {
            console.error("Comment error:", error);
            setCommentError(error.message || "Could not connect to the server.");
        } finally {
            setCommentLoading(false);
        }
    };

    const toggleCollections = async () => {
        if (showCollections) {
            setShowCollections(false);
            return;
        }
        if (!token) {
            setCollectionError("Please log in to save posts to a collection.");
            setShowCollections(true);
            return;
        }

        setCollectionsLoading(true);
        setCollectionError("");
        try {
            const response = await fetch(`${API_URL}/collections`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Could not load collections.");
            }
            setCollections(Array.isArray(data) ? data : []);
            setShowCollections(true);
        } catch (error) {
            setCollectionError(error.message || "Could not load collections.");
            setShowCollections(true);
        } finally {
            setCollectionsLoading(false);
        }
    };

    const toggleCollectionPost = async (collectionId) => {
        if (!token) return;

        setCollectionError("");
        try {
            const response = await fetch(
                `${API_URL}/collections/${collectionId}/posts/${post._id}`,
                {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Could not update collection.");
            }

            setCollections((currentCollections) =>
                currentCollections.map((collection) => {
                    if (collection._id !== collectionId) return collection;
                    const savedPosts = collection.posts || [];
                    return {
                        ...collection,
                        posts: data.saved
                            ? [...savedPosts, { _id: post._id }]
                            : savedPosts.filter(
                                (savedPost) =>
                                    (typeof savedPost === "string"
                                        ? savedPost
                                        : savedPost._id) !== post._id
                            ),
                    };
                })
            );
        } catch (error) {
            setCollectionError(error.message || "Could not update collection.");
        }
    };

    return (
        <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md">

            {/* Post header */}
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3 px-5 py-4">
                    {post.user?.profilePicture ? (
                        <img
                            src={assetUrl(post.user.profilePicture)}
                            alt={post.user.username}
                            className="h-11 w-11 rounded-full object-cover"
                        />
                    ) : (
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                            {post.user?.username?.charAt(0).toUpperCase() || "U"}
                        </div>
                    )}
                    <div>
                        <h3 className="font-semibold text-gray-900">
                            {post.user?.username || "Unknown user"}
                        </h3>
                        <p className="text-xs text-gray-500">
                            Shared on FrameFlow
                        </p>
                    </div>
                </div>
                {creatorId && (
                    <button
                        type="button"
                        onClick={handleFollow}
                        disabled={followLoading}
                        className={`rounded-full px-5 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            following
                                ? "border border-gray-300 bg-white text-gray-700 hover:border-red-300 hover:text-red-600"
                                : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                    >
                        {followLoading
                            ? "Please wait..."
                            : following
                                ? "Following"
                                : "Follow"}
                    </button>
                )}
            </div>

            {/* Caption */}
            {post.caption && (
                <div className="px-5 py-4">
                    <p className="leading-relaxed text-gray-700">
                        {post.caption}
                    </p>
                </div>
            )}

            {/* Post image */}
            <div className="flex max-h-[650px] items-center justify-center overflow-hidden bg-gray-50">
                {post.imageUrl && (
                    <img
                        src={assetUrl(post.imageUrl)}
                        alt={post.caption || "Shared photograph"}
                        className="block max-h-[650px] w-full object-contain"
                    />
                )}
            </div>

            {/* Post actions */}
            <div className="flex items-center gap-5 border-b border-gray-100 px-5 py-4">
                <button
                    type="button"
                    onClick={handleLike}
                    disabled={likeLoading}
                    aria-label={liked ? "Unlike post" : "Like post"}
                    aria-pressed={liked}
                    className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                        liked
                            ? "bg-rose-50 text-rose-600"
                            : "text-gray-600 hover:bg-rose-50 hover:text-rose-600"
                    }`}
                >
                    <span className="text-2xl leading-none">
                        {liked ? "♥" : "♡"}
                    </span>
                    {likeLoading ? "Liking..." : "Like"}
                </button>

                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="text-xl">💬</span>
                    {comments.length} Comments
                </div>

                <span className="ml-auto text-sm font-medium text-gray-600">
                    {likes} {likes === 1 ? "like" : "likes"}
                </span>
            </div>

            <div className="border-b border-gray-100 px-5 py-3">
                <button
                    type="button"
                    onClick={toggleCollections}
                    className="text-sm font-semibold text-blue-600 hover:underline"
                >
                    {showCollections ? "Hide collections" : "Save to collection"}
                </button>
                {showCollections && (
                    <div className="mt-3 space-y-2">
                        {collectionsLoading ? (
                            <p className="text-sm text-gray-500">Loading collections...</p>
                        ) : collectionError ? (
                            <p role="alert" className="text-sm text-red-600">
                                {collectionError}
                            </p>
                        ) : collections.length ? (
                            collections.map((collection) => {
                                const isSaved = collection.posts?.some(
                                    (savedPost) =>
                                        (typeof savedPost === "string"
                                            ? savedPost
                                            : savedPost._id) === post._id
                                );
                                return (
                                    <label
                                        key={collection._id}
                                        className="flex items-center gap-2 text-sm text-gray-700"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={Boolean(isSaved)}
                                            onChange={() => toggleCollectionPost(collection._id)}
                                        />
                                        {collection.name}
                                    </label>
                                );
                            })
                        ) : (
                            <p className="text-sm text-gray-500">
                                No collections yet. Create one from your profile.
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Comments section */}
            <div className="px-5 py-5">
                <h4 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-500">
                    Comments
                </h4>

                <div className="max-h-72 space-y-4 overflow-y-auto">
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div
                                key={comment._id || index}
                                className="flex items-start gap-3"
                            >
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                                    {(comment.user?.username || comment.username || "U")
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>

                                <div className="min-w-0 flex-1 rounded-xl bg-gray-50 px-4 py-3">
                                    <p className="mb-1 text-sm font-semibold text-gray-900">
                                        {comment.user?.username || comment.username || "User"}
                                    </p>
                                    <p className="wrap-break-words text-sm leading-relaxed text-gray-600">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="py-3 text-sm text-gray-400">
                            No comments yet. Start the conversation!
                        </p>
                    )}
                </div>

                {/* Comment form */}
                <form
                    onSubmit={handleCommentSubmit}
                    className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5"
                >
                    <input
                        type="text"
                        value={commentText}
                        onChange={(event) =>
                            setCommentText(event.target.value)
                        }
                        placeholder="Write a comment..."
                        aria-label="Write a comment"
                        maxLength={500}
                        className="min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-5 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                        type="submit"
                        disabled={!commentText.trim() || commentLoading}
                        className="rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                        {commentLoading ? "Posting..." : "Comment"}
                    </button>
                </form>
                {commentError && (
                    <p role="alert" className="mt-3 text-sm text-red-600">
                        {commentError}
                    </p>
                )}
            </div>
        </article>
    );
}

export default Post;
