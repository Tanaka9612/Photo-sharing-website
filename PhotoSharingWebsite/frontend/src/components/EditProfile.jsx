import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

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
                "http://localhost:5000/api/users/me",
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

                <h1>Loading profile...</h1>

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

                <h1>Edit Profile</h1>

                <p className="edit-profile-description">
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


                <form onSubmit={handleSubmit}>

                    {/* Username */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="username"
                        >
                            Username
                        </label>

                        <input
                            id="username"
                            className="form-control"
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter your username"
                        />

                    </div>


                    {/* Email */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="email"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            className="form-control"
                            type="email"
                            value={user.email}
                            disabled
                        />

                        <small>
                            Email cannot be changed here.
                        </small>

                    </div>


                    {/* Bio */}
                    <div className="form-group">

                        <label
                            className="form-label"
                            htmlFor="bio"
                        >
                            Bio
                        </label>

                        <textarea
                            id="bio"
                            className="form-control"
                            value={bio}
                            onChange={(e) =>
                                setBio(e.target.value)
                            }
                            placeholder="Tell people a little about yourself..."
                            rows="5"
                        />

                    </div>


                    {/* Buttons */}
                    <div className="edit-profile-actions">

                        <button
                            type="button"
                            className="cancel-button"
                            onClick={() =>
                                navigate("/profile")
                            }
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditProfile;