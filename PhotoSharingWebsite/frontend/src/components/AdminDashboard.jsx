import { useEffect, useState } from "react";
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
            <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                <p role="status" className="rounded-2xl border border-blue-100 bg-white px-6 py-4 font-medium text-slate-600 shadow-sm">
                    Loading admin dashboard...
                </p>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="border-b border-blue-100 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div>
                        <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
                            FrameFlow
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                            Administration
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage community members and shared photos.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => navigate("/home")}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                    >
                        Back to FrameFlow
                    </button>
                </div>
            </header>

            <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8">
                {error && (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                    >
                        {error}
                    </div>
                )}

                <section
                    aria-label="Dashboard summary"
                    className="grid gap-4 sm:grid-cols-2"
                >
                    <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Community members</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{users.length}</p>
                        <p className="mt-1 text-sm text-blue-600">Registered accounts</p>
                    </article>
                    <article className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">Shared photos</p>
                        <p className="mt-2 text-3xl font-bold text-slate-900">{posts.length}</p>
                        <p className="mt-1 text-sm text-blue-600">Posts across FrameFlow</p>
                    </article>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-1 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6">
                        <div>
                            <h2 className="text-lg font-bold">Users</h2>
                            <p className="text-sm text-slate-500">
                                Review accounts and manage access.
                            </p>
                        </div>
                        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                            {users.length} total
                        </span>
                    </div>

                    {users.length ? (
                        <div className="divide-y divide-slate-100">
                            {users.map((user) => (
                                <article
                                    key={user._id}
                                    className="flex flex-col gap-4 px-5 py-4 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                                >
                                    <div className="flex min-w-0 items-center gap-3">
                                        {user.profilePicture ? (
                                            <img
                                                src={`http://localhost:5000${user.profilePicture}`}
                                                alt=""
                                                className="h-11 w-11 rounded-full border border-slate-200 object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-700">
                                                {user.username?.charAt(0).toUpperCase() || "U"}
                                            </div>
                                        )}
                                        <div className="min-w-0">
                                            <p className="truncate font-semibold text-slate-900">
                                                {user.username}
                                            </p>
                                            <p className="truncate text-sm text-slate-500">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                            user.role === "admin"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-slate-100 text-slate-600"
                                        }`}>
                                            {user.role === "admin" ? "Administrator" : "Member"}
                                        </span>
                                        {user.role !== "admin" && (
                                            <button
                                                type="button"
                                                onClick={() => deleteUser(user._id)}
                                                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                                            >
                                                Delete user
                                            </button>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <p className="px-6 py-10 text-center text-sm text-slate-500">
                            No users to display.
                        </p>
                    )}
                </section>

                <section>
                    <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="text-lg font-bold">Posts</h2>
                            <p className="text-sm text-slate-500">
                                Review photos shared by the community.
                            </p>
                        </div>
                        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
                            {posts.length} total
                        </span>
                    </div>

                    {posts.length ? (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.map((post) => (
                                <article
                                    key={post._id}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    {post.imageUrl ? (
                                        <img
                                            src={`http://localhost:5000${post.imageUrl}`}
                                            alt={post.caption || "Community post"}
                                            className="aspect-[4/3] w-full bg-slate-100 object-cover"
                                        />
                                    ) : (
                                        <div className="flex aspect-[4/3] items-center justify-center bg-slate-100 text-sm text-slate-400">
                                            No image available
                                        </div>
                                    )}
                                    <div className="space-y-3 p-4">
                                        <div>
                                            <p className="font-semibold text-slate-900">
                                                {post.user?.username || "Unknown user"}
                                            </p>
                                            <p className="mt-1 line-clamp-3 min-h-5 text-sm text-slate-600">
                                                {post.caption || "No caption"}
                                            </p>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                            <span className="text-xs font-medium text-slate-500">
                                                {post.likes?.length || 0} likes
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => deletePost(post._id)}
                                                className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:border-red-300 hover:bg-red-50"
                                            >
                                                Delete post
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
                            <p className="font-semibold text-slate-700">No posts yet</p>
                            <p className="mt-1 text-sm text-slate-500">
                                Community photos will appear here when they are shared.
                            </p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
export default AdminDashboard;