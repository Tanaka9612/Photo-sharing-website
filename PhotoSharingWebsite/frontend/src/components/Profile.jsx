import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import { API_URL, assetUrl } from "../config/api";

const primaryButtonClass =
    "inline-flex min-h-10 items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButtonClass =
    "inline-flex min-h-10 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50";
const dangerButtonClass =
    "inline-flex min-h-9 items-center justify-center rounded-xl border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:cursor-not-allowed disabled:opacity-50";

async function request(path, options = {}) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: {
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            Authorization: `Bearer ${token}`,
            ...options.headers,
        },
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "The request failed.");
    }

    return data;
}

function Profile() {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [collections, setCollections] = useState([]);
    const [activeTab, setActiveTab] = useState("photos");
    const [selectedPost, setSelectedPost] = useState(null);
    const [albumName, setAlbumName] = useState("");
    const [albumDescription, setAlbumDescription] = useState("");
    const [selectedPostIds, setSelectedPostIds] = useState([]);
    const [collectionName, setCollectionName] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const loadProfile = async () => {
        const profileData = await request("/users/me");
        setUser(profileData);
        const [postData, albumData, collectionData] = await Promise.all([
            request("/posts/user"),
            request("/albums"),
            request("/collections"),
        ]);
        setPosts(Array.isArray(postData) ? postData : []);
        setAlbums(Array.isArray(albumData) ? albumData : []);
        setCollections(Array.isArray(collectionData) ? collectionData : []);
    };

    useEffect(() => {
        const load = async () => {
            if (!localStorage.getItem("token")) {
                setLoading(false);
                return;
            }

            try {
                await loadProfile();
            } catch (loadError) {
                setError(loadError.message || "Unable to load your profile.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    useEffect(() => {
        if (!selectedPost) return undefined;

        const closeOnEscape = (event) => {
            if (event.key === "Escape") setSelectedPost(null);
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [selectedPost]);

    const withSaving = async (action) => {
        setSaving(true);
        setError("");
        try {
            await action();
        } catch (actionError) {
            setError(actionError.message || "Unable to complete that action.");
        } finally {
            setSaving(false);
        }
    };

    const createAlbum = (event) => {
        event.preventDefault();
        withSaving(async () => {
            await request("/albums", {
                method: "POST",
                body: JSON.stringify({
                    name: albumName,
                    description: albumDescription,
                    postIds: selectedPostIds,
                }),
            });
            setAlbumName("");
            setAlbumDescription("");
            setSelectedPostIds([]);
            await loadProfile();
        });
    };

    const createCollection = (event) => {
        event.preventDefault();
        withSaving(async () => {
            await request("/collections", {
                method: "POST",
                body: JSON.stringify({ name: collectionName }),
            });
            setCollectionName("");
            await loadProfile();
        });
    };

    const deleteAlbum = (albumId) => {
        withSaving(async () => {
            await request(`/albums/${albumId}`, { method: "DELETE" });
            await loadProfile();
        });
    };

    const deleteCollection = (collectionId) => {
        withSaving(async () => {
            await request(`/collections/${collectionId}`, { method: "DELETE" });
            await loadProfile();
        });
    };

    const toggleSavedPost = (collectionId, postId) => {
        withSaving(async () => {
            await request(`/collections/${collectionId}/posts/${postId}`, {
                method: "POST",
            });
            await loadProfile();
            const refreshedPost = posts.find((post) => post._id === postId);
            if (refreshedPost) setSelectedPost(refreshedPost);
        });
    };

    const toggleAlbumPost = (postId) => {
        setSelectedPostIds((currentIds) =>
            currentIds.includes(postId)
                ? currentIds.filter((id) => id !== postId)
                : [...currentIds, postId]
        );
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }
    if (!user) {
        return <p><Link to="/login">Please log in.</Link></p>;
    }

    return (
        <div className="profile-page">
            <SideNav />
            <main className="profile-content">
                <h1 className="profile-page-title">
                    Profile<span>({user.username})</span>
                </h1>
                {error && (
                    <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}
                <section className="profile-header">
                    <div className="cover-container">
                        <img
                            src="/src/assets/demo.jpg"
                            alt="Profile cover"
                            className="cover-image"
                        />
                    </div>
                    <div className="profile-information">
                        <div className="profile-picture-container">
                            {user.profilePicture ? (
                                <img
                                    src={assetUrl(user.profilePicture)}
                                    alt={`${user.username}'s profile`}
                                    className="profile-picture"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-3xl font-bold text-gray-600">
                                    {user.username.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <div className="profile-details">
                            <div className="profile-name-row">
                                <div>
                                    <h2>{user.username}</h2>
                                    <p className="username">@{user.username}</p>
                                </div>
                                <div className="profile-actions">
                                    <Link to="/edit-profile" className={primaryButtonClass}>
                                        Edit Profile
                                    </Link>
                                    <Link to="/upload" className={secondaryButtonClass}>
                                        Upload
                                    </Link>
                                </div>
                            </div>
                            <p className="bio">{user.bio || "No bio yet."}</p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat">
                            <strong>{user.postsCount ?? posts.length}</strong>
                            <span>Posts</span>
                        </div>
                        <div className="stat">
                            <strong>{user.followersCount ?? 0}</strong>
                            <span>Followers</span>
                        </div>
                        <div className="stat">
                            <strong>{user.followingCount ?? 0}</strong>
                            <span>Following</span>
                        </div>
                        <div className="stat">
                            <strong>{user.collectionsCount ?? collections.length}</strong>
                            <span>Collections</span>
                        </div>
                        <div className="stat">
                            <strong>{user.likesReceived ?? 0}</strong>
                            <span>Likes Received</span>
                        </div>
                    </div>
                </section>

                <div className="profile-tabs" role="tablist" aria-label="Profile content">
                    {[
                        ["photos", "Photos"],
                        ["albums", "Albums"],
                        ["collections", "Collections"],
                    ].map(([tab, label]) => (
                        <button
                            key={tab}
                            type="button"
                            role="tab"
                            aria-selected={activeTab === tab}
                            className={`inline-flex min-h-10 items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                activeTab === tab
                                    ? "bg-blue-600 text-white shadow-sm"
                                    : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                            }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {activeTab === "photos" && (
                    <section className="photo-grid" aria-label="Your photos">
                        {posts.length ? posts.map((post) => (
                            <button
                                type="button"
                                key={post._id}
                                className="profile-post cursor-pointer border-0 p-0"
                                onClick={() => setSelectedPost(post)}
                                aria-label={`View post with ${post.likes?.length || 0} likes and ${post.comments?.length || 0} comments`}
                            >
                                <img
                                    src={assetUrl(post.imageUrl)}
                                    alt={post.caption || "Your post"}
                                />
                            </button>
                        )) : <p>No posts yet.</p>}
                    </section>
                )}

                {activeTab === "albums" && (
                    <section className="space-y-6 py-5">
                        <form onSubmit={createAlbum} className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
                            <h2 className="text-lg font-semibold">Create an album</h2>
                            <input
                                className="w-full rounded-lg border border-gray-300 p-2"
                                value={albumName}
                                onChange={(event) => setAlbumName(event.target.value)}
                                placeholder="Album name"
                                maxLength={100}
                                required
                            />
                            <textarea
                                className="w-full rounded-lg border border-gray-300 p-2"
                                value={albumDescription}
                                onChange={(event) => setAlbumDescription(event.target.value)}
                                placeholder="Description (optional)"
                                maxLength={500}
                                rows={2}
                            />
                            {posts.length ? (
                                <fieldset>
                                    <legend className="mb-2 text-sm font-medium">
                                        Select posts to include
                                    </legend>
                                    <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                                        {posts.map((post) => (
                                            <label key={post._id} className="cursor-pointer text-xs">
                                                <img
                                                    className="mb-1 aspect-square w-full rounded-md object-cover"
                                                    src={assetUrl(post.imageUrl)}
                                                    alt={post.caption || "Your post"}
                                                />
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPostIds.includes(post._id)}
                                                    onChange={() => toggleAlbumPost(post._id)}
                                                />{" "}
                                                Include
                                            </label>
                                        ))}
                                    </div>
                                </fieldset>
                            ) : (
                                <p>Upload a post before creating an album.</p>
                            )}
                            <button
                                type="submit"
                                disabled={saving || !posts.length || !selectedPostIds.length}
                                className={primaryButtonClass}
                            >
                                {saving ? "Saving..." : "Create album"}
                            </button>
                        </form>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {albums.map((album) => (
                                <article key={album._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                    {album.posts?.[0] && (
                                        <img
                                            className="h-40 w-full object-cover"
                                            src={assetUrl(album.posts[0].imageUrl)}
                                            alt=""
                                        />
                                    )}
                                    <div className="flex items-center justify-between p-3">
                                        <div>
                                            <h3 className="font-semibold">{album.name}</h3>
                                            <p className="text-sm text-gray-600">
                                                {album.posts?.length || 0} posts
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => deleteAlbum(album._id)}
                                            disabled={saving}
                                            className={dangerButtonClass}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === "collections" && (
                    <section className="space-y-5 py-5">
                        <form onSubmit={createCollection} className="flex flex-wrap gap-3 rounded-xl border border-gray-200 bg-white p-4">
                            <label className="sr-only" htmlFor="collection-name">Collection name</label>
                            <input
                                id="collection-name"
                                className="min-w-0 flex-1 rounded-lg border border-gray-300 p-2"
                                value={collectionName}
                                onChange={(event) => setCollectionName(event.target.value)}
                                placeholder="New collection name"
                                maxLength={100}
                                required
                            />
                            <button
                                type="submit"
                                disabled={saving}
                                className={primaryButtonClass}
                            >
                                {saving ? "Saving..." : "Create collection"}
                            </button>
                        </form>
                        {collections.length ? (
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {collections.map((collection) => (
                                    <article key={collection._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                                        {collection.posts?.[0] && (
                                            <img
                                                className="h-40 w-full object-cover"
                                                src={assetUrl(collection.posts[0].imageUrl)}
                                                alt=""
                                            />
                                        )}
                                        <div className="flex items-center justify-between p-3">
                                            <div>
                                                <h3 className="font-semibold">{collection.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {collection.posts?.length || 0} saved posts
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => deleteCollection(collection._id)}
                                                disabled={saving}
                                                className={dangerButtonClass}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <p>No collections yet. Create one, then save posts to it.</p>
                        )}
                    </section>
                )}
            </main>

            {selectedPost && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
                    role="presentation"
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) setSelectedPost(null);
                    }}
                >
                    <section
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="post-detail-title"
                        className="relative grid max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-white md:grid-cols-2"
                    >
                        <button
                            type="button"
                            onClick={() => setSelectedPost(null)}
                            aria-label="Close post details"
                            className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            ×
                        </button>
                        <div className="flex min-h-64 items-center justify-center bg-gray-950">
                            <img
                                className="max-h-[80vh] w-full object-contain"
                                src={assetUrl(selectedPost.imageUrl)}
                                alt={selectedPost.caption || "Your post"}
                            />
                        </div>
                        <div className="flex min-h-0 flex-col p-5">
                            <h2 id="post-detail-title" className="pr-10 text-xl font-bold">
                                Post details
                            </h2>
                            {selectedPost.caption && (
                                <p className="mt-2 text-gray-700">{selectedPost.caption}</p>
                            )}
                            <p className="mt-3 font-semibold text-rose-600">
                                ♥ {selectedPost.likes?.length || 0}{" "}
                                {(selectedPost.likes?.length || 0) === 1 ? "like" : "likes"}
                            </p>
                            <h3 className="mb-2 mt-5 font-semibold">
                                Comments ({selectedPost.comments?.length || 0})
                            </h3>
                            <div className="min-h-0 flex-1 space-y-3 overflow-y-auto">
                                {selectedPost.comments?.length ? selectedPost.comments.map((comment) => (
                                    <article key={comment._id} className="rounded-lg bg-gray-50 p-3">
                                        <p className="font-semibold">
                                            {comment.user?.username || "User"}
                                        </p>
                                        <p className="mt-1 whitespace-pre-wrap text-sm text-gray-700">
                                            {comment.text}
                                        </p>
                                    </article>
                                )) : (
                                    <p className="text-sm text-gray-500">No comments yet.</p>
                                )}
                            </div>
                            <div className="mt-5 border-t border-gray-200 pt-4">
                                <h3 className="mb-2 font-semibold">Save to a collection</h3>
                                {collections.length ? (
                                    <div className="space-y-2">
                                        {collections.map((collection) => {
                                            const saved = collection.posts?.some(
                                                (post) => (typeof post === "string" ? post : post._id) === selectedPost._id
                                            );
                                            return (
                                                <label key={collection._id} className="flex items-center gap-2 text-sm">
                                                    <input
                                                        type="checkbox"
                                                        checked={Boolean(saved)}
                                                        disabled={saving}
                                                        onChange={() => toggleSavedPost(collection._id, selectedPost._id)}
                                                    />
                                                    {collection.name}
                                                </label>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        Create a collection from the Collections tab first.
                                    </p>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default Profile;
