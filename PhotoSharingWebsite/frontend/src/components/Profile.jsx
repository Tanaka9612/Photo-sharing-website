import React from "react";
import SideNav from "./SideNav";
import Upload from "./Upload";
import { Link } from "react-router";
import{ useEffect, useState } from "react";

function Profile() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                console.log("No token found");
                setLoading(false);
                return;
            }
            try{
                const response = await fetch(
                    "http://localhost:5000/api/users/me",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    console.log(data.message);
                }
            } catch (error) {
                console.error(
                    "Error getting user:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);
    if (loading) {
    return <p>Loading profile...</p>;
    }
    if (!user) {
        return <p>Please log in.</p>;
    }
    return (
        <div className="profile-page">
            <SideNav/>
            <main className="profile-content">
                <h1 className="profile-page-title">
                    Profile<span>({user.username})</span>
                </h1>
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
                            <img
                                src="/src/demo.jpg"
                                alt="Profile"
                                className="profile-picture"
                            />
                        </div>
                        <div className="profile-details">
                            <div className="profile-name-row">
                                <div>
                                    <h2>{user?.username}</h2>

                                    <p className="username">
                                        @{user?.username}
                                    </p>
                                </div>

                                <div className="profile-actions">
                                    <Link
                                        to="/edit-profile"
                                        className="edit-button"
                                    >
                                        Edit Profile
                                    </Link>

                                    <Link className="settings-button">
                                        upload
                                    </Link>
                                </div>
                            </div>

                            <p className="bio">
                                {user?.bio || "No bio yet."}
                            </p>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat">
                            <strong>{user.posts}</strong>
                            <span>Posts</span>
                        </div>
                        <div className="stat">
                            <strong>1.2K</strong>
                            <span>Followers</span>
                        </div>
                        <div className="stat">
                            <strong>320</strong>
                            <span>Following</span>
                        </div>
                        <div className="stat">
                            <strong>56</strong>
                            <span>Collections</span>
                        </div>
                        <div className="stat">
                            <strong>2.4K</strong>
                            <span>Likes Received</span>
                        </div>
                    </div>
                </section>
                <div className="profile-tabs">
                    <button className="profile-tab active">
                        Photos
                    </button>
                    <button className="profile-tab">
                        Collections
                    </button>
                    <button className="profile-tab">
                        Liked
                    </button>
                </div>
                <section className="photo-grid">
                    {/* {posts.map((post) => (
                        <div
                            className="profile-post"
                            key={post.id}
                        >
                            <img
                                src={post.image}
                                alt={`Post ${post.id}`}
                            />
                        </div>
                    ))} */}
                </section>
            </main>
        </div>
    );
}

export default Profile;