import React from "react";
import { Link } from "react-router-dom";
import { Lineicons } from "@lineiconshq/react-lineicons";
import {Home2Bulk, 
    Bookmark1Outlined,
    Search1Outlined,
    Gear1Outlined,
    Flower2Outlined,
    Message2Outlined,
    DiscoverOutlined,
    LocationArrowRightOutlined,
    FriendliOutlined
} from "@lineiconshq/free-icons"
import Home from "./Home";
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

                <Link to="/home" element={<Home/>} className="nav-item active">
                    <span className="nav-icon"><Lineicons icon={Home2Bulk} size={20} color="black"/></span>
                    <span>Home</span>
                </Link>

                <Link to="/discover" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={DiscoverOutlined} size={20} color="black"/></span>
                    <span>Discover</span>
                </Link>

                <Link to="/following" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={FriendliOutlined} size={20} color="black"/></span>
                    <span>Following</span>
                </Link>

                <Link to="/activity" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={Flower2Outlined} size={20} color="black"/></span>
                    <span>Activity</span>
                </Link>

                <Link to="/collections" className="nav-item">
                    <span className="nav-icon">▢</span>
                    <span>Collections</span>
                </Link>

                <Link to="/messages" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={Message2Outlined} size={20} color="black"/></span>
                    <span>Messages</span>
                </Link>

                <Link to="/bookmarks" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={Bookmark1Outlined} size={20} color="black"/></span>
                    <span>Bookmarks</span>
                </Link>

                <Link to="/settings" className="nav-item">
                    <span className="nav-icon"><Lineicons icon={Gear1Outlined} size={20} color="black"/></span>
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