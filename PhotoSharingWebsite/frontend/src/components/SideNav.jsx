import React from "react";
import { Link ,useNavigate} from "react-router-dom";
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
import { useState } from "react";
import { useEffect } from "react";
// import "./ProfileSidebar.css";

function SideNav() {
    const navigate = useNavigate();
    const [user, setuser] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const getUser = async()=>{
            const token = localStorage.getItem("token");
            if(!token){
                console.log("No token found");
                setLoading(false);
                return;
            }
            try{
                const response = await fetch("http://localhost:5000/api/users/me",{
                    method: "GET",
                    headers:{
                        "Authorization":`Bearer ${token}`
                    }
                })
                const data = await response.json();
                if(response.ok){
                    setuser(data);
                }else{
                    console.log(data.message);
                }
            }catch(error){
                console.log(error.message)
            }finally{
                setLoading(false);
            }
        };
        getUser();
        
    }, [])
    const handleLogout=()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        // Send user back to login
        navigate("/login");
    }
    if(loading){
        return <p>Loading...</p>
    }
    if(!user){
        return <div>
            <p>Please Login here <Link to={<Login/>}>Login</Link></p>
        </div>
    }
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
                {user?.role === "admin" && (

                    <Link to="/admin">
                        Admin Dashboard
                    </Link>

                )}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </nav>

            {/* Bottom section */}
            <div className="sidebar-more">
                More
            </div>

        </aside>
    );
}

export default SideNav;