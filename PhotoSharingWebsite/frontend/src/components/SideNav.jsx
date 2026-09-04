import React from "react";
import { Link } from "react-router-dom";
// import "./ProfileSidebar.css";

function SideNav() {
    return (
        <aside className="profile-sidebar">

            {/* Logo */}
            <div className="sidebar-logo">
                <span>FrameFlow</span>
            </div>

            {/* Navigation */}
            <nav className="sidebar-nav">

                <Link to="/home" className="nav-item active">
                    <span className="nav-icon">⌂</span>
                    <span>Home</span>
                </Link>

                <Link to="/discover" className="nav-item">
                    <span className="nav-icon">⌂</span>
                    <span>Discover</span>
                </Link>

                <Link to="/following" className="nav-item">
                    <span className="nav-icon">◉</span>
                    <span>Following</span>
                </Link>

                <Link to="/activity" className="nav-item">
                    <span className="nav-icon">♧</span>
                    <span>Activity</span>
                </Link>

                <Link to="/collections" className="nav-item">
                    <span className="nav-icon">▢</span>
                    <span>Collections</span>
                </Link>

                <Link to="/messages" className="nav-item">
                    <span className="nav-icon">✉</span>
                    <span>Messages</span>
                </Link>

                <Link to="/bookmarks" className="nav-item">
                    <span className="nav-icon">♧</span>
                    <span>Bookmarks</span>
                </Link>

                <Link to="/settings" className="nav-item">
                    <span className="nav-icon">⚙</span>
                    <span>Settings</span>
                </Link>

            </nav>

            {/* Bottom section */}
            <div className="sidebar-more">
                More
            </div>

        </aside>
    );
}

export default SideNav;