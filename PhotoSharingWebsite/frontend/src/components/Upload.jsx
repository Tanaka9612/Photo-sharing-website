import React, { useState } from "react";
import "./upload.css";

function Upload() {

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    // When the user selects an image
    const handleImageChange = (e) => {

        const file = e.target.files[0];

        if (!file) {
            return;
        }
        // Make sure it is an image
        if (!file.type.startsWith("image/")) {
            setMessage("Please select an image file.");
            return;
        }
        setImage(file);
        // Create preview
        const imageURL = URL.createObjectURL(file);
        setPreview(imageURL);

        setMessage("");
    };

    // Upload image
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            setMessage("Please select an image first.");
            return;
        }
        setUploading(true);
        setMessage("");
        try {

            const formData = new FormData();
            formData.append("image", image);
            formData.append("caption", caption);

            const response = await fetch(
                "http://localhost:5000/api/posts",
                {
                    method: "POST",
                    body: formData
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Upload failed.");
            }
            setMessage("Image uploaded successfully!");
            // Clear form
            setImage(null);
            setPreview(null);
            setCaption("");

        } catch (error) {

            console.error("Upload error:", error);

            setMessage(
                error.message || "Something went wrong while uploading."
            );

        } finally {

            setUploading(false);
        }
    };
    return (
        <div className="upload-page">
            <div className="upload-container">
                <h1>Upload a Photo</h1>
                <p className="upload-description">
                    Share your vision with the FrameFlow community.
                </p>
                <form onSubmit={handleSubmit}>
                    {/* Image upload area */}
                    <label
                        htmlFor="image-upload"
                        className="upload-box"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="image-preview"
                            />
                        ) : (
                            <div className="upload-placeholder">
                                <div className="upload-icon">
                                    +
                                </div>
                                <h3>Choose an image</h3>
                                <p>
                                    Click here to select a photo
                                </p>
                            </div>
                        )}
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        hidden
                    />
                    {/* Caption */}
                    <div className="caption-section">
                        <label htmlFor="caption">
                            Caption
                        </label>
                        <textarea
                            id="caption"
                            value={caption}
                            onChange={(e) =>
                                setCaption(e.target.value)
                            }
                            placeholder="Tell people about your photo..."
                            maxLength="500"
                        />

                        <div className="character-count">
                            {caption.length}/500
                        </div>
                    </div>
                    {/* Upload button */}
                    <button
                        type="submit"
                        className="upload-button"
                        disabled={uploading}
                    >
                        {uploading
                            ? "Uploading..."
                            : "Upload Photo"
                        }
                    </button>
                    {/* Status message */}
                    {message && (
                        <p className="upload-message">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Upload;