import { useEffect, useState } from "react";
import NavigationBar from "./NavigationBar";
import PostFeed from "./PostFeed";

function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const fetchFeed = async () => {
            const token = localStorage.getItem("token");

            try {
                const headers = token
                    ? { Authorization: `Bearer ${token}` }
                    : {};
                const response = await fetch("http://localhost:5000/api/feed", {
                    headers,
                });
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Unable to load posts.");
                }

                if (!Array.isArray(data)) {
                    throw new Error("The server returned an invalid posts list.");
                }

                if (!cancelled) {
                    setPosts(data);
                }
            } catch (fetchError) {
                if (!cancelled) {
                    setError(fetchError.message || "Unable to connect to the server.");
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        fetchFeed();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <>
            <NavigationBar />
            <main className="mx-auto min-h-screen max-w-7xl px-4 pb-10 pt-24 sm:px-6 lg:px-8">
                {loading ? (
                    <p role="status" className="text-center text-gray-600">
                        Loading posts...
                    </p>
                ) : error ? (
                    <div role="alert" className="text-center text-red-600">
                        <p>{error}</p>
                    </div>
                ) : posts.length === 0 ? (
                    <p className="text-center text-gray-600">
                        No posts have been shared yet.
                    </p>
                ) : (
                    <PostFeed posts={posts} />
                )}
            </main>
        </>
    );
}

export default Home;
