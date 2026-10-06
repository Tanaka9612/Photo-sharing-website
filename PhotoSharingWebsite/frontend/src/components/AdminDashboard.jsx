import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadAdminData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }
            try {
                const [usersResponse, postsResponse] =
                    await Promise.all([
                        fetch("http://localhost:5000/api/admin/users",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        ),
                        fetch("http://localhost:5000/api/admin/posts",
                            {
                                headers: {
                                    Authorization:
                                        `Bearer ${token}`
                                }
                            }
                        )
                    ]);
                const usersData =
                    await usersResponse.json();
                const postsData =
                    await postsResponse.json();
                if (usersResponse.status === 403 ||postsResponse.status === 403) {
                    setError(
                        "You do not have administrator access."
                    );
                    return;
                }
                if (usersResponse.ok) {
                    setUsers(usersData);
                }
                if (postsResponse.ok) {
                    setPosts(postsData);
                }
            } catch (error) {
                console.error(
                    "Admin dashboard error:",
                    error
                );
                setError(
                    "Could not load admin dashboard."
                );
            } finally {
                setLoading(false);
            }
        };
        loadAdminData();
    }, [navigate]);
    // Delete user
    const deleteUser = async (id) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );
        if (!confirmed) {
            return;
        }
        const token =
            localStorage.getItem("token");
        try{
            const response = await fetch(
                `http://localhost:5000/api/admin/users/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            const data =
                await response.json();
            if (response.ok) {
                setUsers(
                    users.filter(
                        user => user._id !== id
                    )
                );
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);

        }
    };
    // Delete post
    const deletePost = async (id) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this post?"
            );
        if (!confirmed) {
            return;
        }
        const token =
            localStorage.getItem("token");
        try {
            const response = await fetch(
                `http://localhost:5000/api/admin/posts/${id}`,
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );
            const data =
                await response.json();
            if (response.ok) {
                setPosts(
                    posts.filter(
                        post => post._id !== id
                    )
                );
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };
    if (loading) {
        return (
            <div>
                Loading admin dashboard...
            </div>
        );
    }
    return (

        <div className="admin-dashboard">
            <h1>
                FrameFlow Administration
            </h1>
            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}
            <section>
                <h2>
                    Users ({users.length})
                </h2>
                {users.map(user => (
                    <div
                        key={user._id}
                        className="admin-user"
                    >
                        <div>
                            <strong>
                                {user.username}
                            </strong>
                            <p>
                                {user.email}
                            </p>
                            <small>
                                Role: {user.role}
                            </small>
                        </div>
                        {user.role !== "admin" && (
                            <button
                                onClick={() =>
                                    deleteUser(user._id)
                                }
                            >
                                Delete User
                            </button>
                        )}
                    </div>
                ))}
            </section>
            <section>
                <h2>
                    Posts ({posts.length})
                </h2>
                {posts.map(post => (
                    <div
                        key={post._id}
                        className="admin-post"
                    >
                        <img
                            src={post.imageUrl}
                            alt={post.caption}
                            width="200"
                        />
                        <div>
                            <strong>
                                {post.user?.username}
                            </strong>
                            <p>
                                {post.caption}
                            </p>
                            <button
                                onClick={() =>
                                    deletePost(post._id)
                                }
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}
export default AdminDashboard;