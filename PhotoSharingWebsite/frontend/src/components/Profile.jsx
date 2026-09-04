import React from "react";
import SideNav from "./SideNav";
import Upload from "./Upload";
import { Link } from "react-router";

function Profile() {

    const posts = [
        {
            id: 1,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 2,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 3,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 4,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 5,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 6,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 7,
            image: "/src/assets/demo.jpg"
        },
        {
            id: 8,
            image: "/src/assets/demo.jpg"
        }
    ];

    return (
        <div className="profile-page">
            <SideNav/>
            <main className="profile-content">
                <h1 className="profile-page-title">
                    Profile<span>(Your Profile)</span>
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
                                    <h2>You</h2>
                                    <p className="username">@yourusername</p>
                                </div>
                                <div className="profile-actions">
                                    <Link to="/upload" element={<Upload/>} className="edit-button">Edit Profile</Link>

                                    <button className="settings-button">⚙</button>
                                </div>
                            </div>
                            <p className="bio">Capturing life, one frame at a time. </p>
                            <div className="profile-meta">
                                <span>
                                    📍 Johannesburg, South Africa
                                </span>
                                <span>
                                    🔗 <u>yourwebsite.com</u>
                                </span>
                                <span>
                                    📅 Joined March 2022
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="profile-stats">
                        <div className="stat">
                            <strong>128</strong>
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
                    {posts.map((post) => (
                        <div
                            className="profile-post"
                            key={post.id}
                        >
                            <img
                                src={post.image}
                                alt={`Post ${post.id}`}
                            />
                        </div>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Profile;