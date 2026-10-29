import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Lineicons } from "@lineiconshq/react-lineicons";
import { Gear1Outlined, Home2Bulk } from "@lineiconshq/free-icons";
import { API_URL } from "../config/api";

function SideNav() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/users/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data);
                } else {
                    console.error(data.message || "Could not load user.");
                }
            } catch (error) {
                console.error("Could not load navigation user:", error);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return <p className="p-3 text-sm text-slate-500">Loading navigation...</p>;
    }

    if (!user) {
        return (
            <aside className="profile-sidebar">
                <NavLink to="/login" className="nav-item">
                    Log in
                </NavLink>
            </aside>
        );
    }

    const navigationItems = [
        {
            to: "/home",
            label: "Home",
            icon: <Lineicons icon={Home2Bulk} size={18} color="currentColor" />,
        },
        { to: "/profile", label: "Profile", icon: "◎" },
        { to: "/collections", label: "Collections", icon: "▢" },
        {
            to: "/edit-profile",
            label: "Settings",
            icon: <Lineicons icon={Gear1Outlined} size={18} color="currentColor" />,
        },
        ...(user.role === "admin"
            ? [{ to: "/admin-dashboard", label: "Admin", icon: "✦" }]
            : []),
    ];

    return (
        <aside className="profile-sidebar">
            <NavLink to="/home" className="sidebar-logo">
                FrameFlow
            </NavLink>

            <nav className="sidebar-nav" aria-label="Main navigation">
                {navigationItems.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `nav-item ${isActive ? "active" : ""}`
                        }
                    >
                        <span className="nav-icon" aria-hidden="true">
                            {icon}
                        </span>
                        <span>{label}</span>
                    </NavLink>
                ))}

                <button
                    type="button"
                    className="nav-logout"
                    onClick={handleLogout}
                >
                    <span aria-hidden="true">↪</span>
                    <span>Log out</span>
                </button>
            </nav>

            <div className="sidebar-more">Signed in as {user.username}</div>
        </aside>
    );
}

export default SideNav;
