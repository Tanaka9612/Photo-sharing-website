import mongoose from "mongoose";
import Album from "../models/Album.js";
import Post from "../models/Post.js";

export const getAlbums = async (req, res) => {
    try {
        const albums = await Album.find({ user: req.user.id }).sort({ createdAt: -1 });
        const albumIds = albums.map((album) => album._id);
        const posts = await Post.find({
            user: req.user.id,
            album: { $in: albumIds }
        }).select("album imageUrl caption");

        const postsByAlbum = new Map();
        for (const post of posts) {
            const albumId = post.album.toString();
            postsByAlbum.set(albumId, [...(postsByAlbum.get(albumId) || []), post]);
        }

        return res.status(200).json(
            albums.map((album) => ({
                ...album.toObject(),
                posts: postsByAlbum.get(album._id.toString()) || []
            }))
        );
    } catch (error) {
        console.error("Get albums error:", error);
        return res.status(500).json({ message: "Failed to fetch albums." });
    }
};

export const getAlbum = async (req, res) => {
    try {
        const album = await Album.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!album) {
            return res.status(404).json({ message: "Album not found." });
        }

        const posts = await Post.find({
            album: album._id,
            user: req.user.id
        }).sort({ createdAt: -1 });

        return res.status(200).json({ ...album.toObject(), posts });
    } catch (error) {
        console.error("Get album error:", error);
        return res.status(500).json({ message: "Failed to fetch album." });
    }
};

export const createAlbum = async (req, res) => {
    try {
        const { name, description = "", postIds = [] } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ message: "Album name is required." });
        }
        if (typeof description !== "string") {
            return res.status(400).json({ message: "Album description must be text." });
        }

        if (
            !Array.isArray(postIds) ||
            postIds.length === 0 ||
            postIds.some((id) => !mongoose.isValidObjectId(id))
        ) {
            return res.status(400).json({
                message: "Select at least one valid post for the album."
            });
        }

        const uniquePostIds = [...new Set(postIds)];
        const posts = await Post.find({
            _id: { $in: uniquePostIds },
            user: req.user.id
        });

        if (posts.length !== uniquePostIds.length) {
            return res.status(400).json({
                message: "Albums can only contain your own posts."
            });
        }

        const album = await Album.create({
            user: req.user.id,
            name: name.trim(),
            description,
            coverImage: posts[0].imageUrl
        });
        await Post.updateMany(
            { _id: { $in: uniquePostIds }, user: req.user.id },
            { $set: { album: album._id } }
        );

        return res.status(201).json({
            ...album.toObject(),
            posts
        });
    } catch (error) {
        console.error("Create album error:", error);
        return res.status(500).json({ message: "Failed to create album." });
    }
};

export const updateAlbum = async (req, res) => {
    try {
        const { name, description } = req.body;
        const album = await Album.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!album) {
            return res.status(404).json({ message: "Album not found." });
        }
        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({ message: "Album name cannot be empty." });
            }
            album.name = name.trim();
        }
        if (description !== undefined) {
            if (typeof description !== "string") {
                return res.status(400).json({ message: "Album description must be text." });
            }
            album.description = description;
        }

        await album.save();
        return res.status(200).json(album);
    } catch (error) {
        console.error("Update album error:", error);
        return res.status(500).json({ message: "Failed to update album." });
    }
};

export const deleteAlbum = async (req, res) => {
    try {
        const album = await Album.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!album) {
            return res.status(404).json({ message: "Album not found." });
        }

        await Promise.all([
            Post.updateMany(
                { album: album._id, user: req.user.id },
                { $unset: { album: "" } }
            ),
            album.deleteOne()
        ]);

        return res.status(200).json({ message: "Album deleted." });
    } catch (error) {
        console.error("Delete album error:", error);
        return res.status(500).json({ message: "Failed to delete album." });
    }
};
