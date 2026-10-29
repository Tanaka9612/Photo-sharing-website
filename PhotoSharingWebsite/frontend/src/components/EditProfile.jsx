import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/api";

function EditProfile() {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // Get the logged-in user's information
    useEffect(() => {

        const getUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setError("You are not logged in.");
                setLoading(false);
                return;
            }

            try {

                const response = await fetch(
                    `${API_URL}/users/me`,
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
                    setUsername(data.username || "");
                    setBio(data.bio || "");
                } else {
                    setError(
                        data.message || "Could not load profile."
                    );
                }

            } catch (error) {
                console.error(
                    "Error getting user:",
                    error
                );
                setError(
                    "Could not connect to the server."
                );
            } finally {
                setLoading(false);
            }
        };
        getUser();

    }, []);

    // Save profile changes
    const handleSubmit = async (e) => {

        e.preventDefault();
        setError("");
        setSuccess("");
        // Basic validation
        if (!username.trim()) {
            setError("Username cannot be empty.");
            return;
        }
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You are not logged in.");
            return;
        }
        setSaving(true);
        try {
            const response = await fetch(
                `${API_URL}/users/me`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        username: username.trim(),
                        bio: bio.trim()
                    })
                }
            );
            const data = await response.json();
            if (response.ok) {
                console.log(
                    "Profile updated:",
                    data.user
                );
                // Update the stored user
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );
                setUser(data.user);
                setSuccess(
                    "Profile updated successfully!"
                );
                // Go back to profile after a short delay
                setTimeout(() => {
                    navigate("/profile");
                }, 1000);

            } else {
                setError(
                    data.message ||
                    "Could not update profile."
                );
            }

        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );

            setError(
                "Could not connect to the server."
            );
        } finally {
            setSaving(false);
        }
    };
    // Loading screen
    if (loading) {
        return (
            <div className="edit-profile-page">

                <h1 className="heading">Loading profile...</h1>

            </div>
        );
    }
    // If the user isn't logged in
    if (!user) {
        return (
            <div className="edit-profile-page">
                <h1>Edit Profile</h1>
                <p>
                    {error || "Please log in to edit your profile."}
                </p>

                <Link to="/login">
                    Go to Login
                </Link>
            </div>
        );
    }
    return (
        <div className="edit-profile-page">
            <div className="edit-profile-container">
                <h1 >Edit Profile</h1>
                <p className="edit-profile-description 
                            text-gray-600
                            text-sm mb-4
                            text-center
                            
                            ">
                    Update your FrameFlow profile information.
                </p>
                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}
                {success && (
                    <p className="success-message">
                        {success}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="flex items-center flex-col p-4 bg-center bg-cover rounded-lg shadow-md border border-gray-200">
                    <div className="form-group flex flex-col gap-2">
                        <label className="block font-semibold text-gray-700" htmlFor="username">Username</label>
                        <input id="username" className="w-md rounded border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" />
                    </div>
                    <div className="form-group flex flex-col">
                        <label className="block font-semibold text-gray-700" htmlFor="email">Email</label>
                        <input id="email" className="w-md rounded border border-gray-300 bg-gray-100 px-3 py-2 text-gray-500" type="email" value={user.email} disabled />
                        <small className="text-sm text-gray-500">Email cannot be changed here.</small>
                    </div>
                    <div className="form-group flex flex-col">
                        <label className="block font-semibold text-gray-700" htmlFor="bio">Bio</label>
                        <textarea id="bio" className="w-md rounded border border-gray-300 px-3 py-2 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell people a little about yourself..." rows={5} />
                    </div>
                    <div className="flex flex-col gap-3 pt-3 sm:flex-row sm:justify-end">
                        <button type="button" className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700" onClick={() => navigate("/profile")}>Cancel</button>
                        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;