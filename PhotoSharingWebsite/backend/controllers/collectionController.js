import mongoose from "mongoose";
import Collection from "../models/Collection.js";
import Post from "../models/Post.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await Collection.find({ user: req.user.id })
            .populate("posts", "imageUrl caption")
            .sort({ createdAt: -1 });

        return res.status(200).json(collections);
    } catch (error) {
        console.error("Get collections error:", error);
        return res.status(500).json({ message: "Failed to fetch collections." });
    }
};

export const createCollection = async (req, res) => {
    try {
        const { name } = req.body;

        if (typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ message: "Collection name is required." });
        }

        const collection = await Collection.create({
            user: req.user.id,
            name: name.trim()
        });

        return res.status(201).json(collection);
    } catch (error) {
        console.error("Create collection error:", error);
        return res.status(500).json({ message: "Failed to create collection." });
    }
};

export const toggleCollectionPost = async (req, res) => {
    try {
        const { id, postId } = req.params;

        if (!mongoose.isValidObjectId(id) || !mongoose.isValidObjectId(postId)) {
            return res.status(400).json({ message: "Invalid collection or post ID." });
        }

        const [collection, post] = await Promise.all([
            Collection.findOne({ _id: id, user: req.user.id }),
            Post.findById(postId).select("_id")
        ]);

        if (!collection) {
            return res.status(404).json({ message: "Collection not found." });
        }
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        const alreadySaved = collection.posts.some(
            (savedPostId) => savedPostId.toString() === postId
        );

        if (alreadySaved) {
            collection.posts.pull(post._id);
        } else {
            collection.posts.addToSet(post._id);
        }
        await collection.save();

        return res.status(200).json({
            collectionId: collection._id,
            postId,
            saved: !alreadySaved,
            postsCount: collection.posts.length
        });
    } catch (error) {
        console.error("Update collection error:", error);
        return res.status(500).json({ message: "Failed to update collection." });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        const collection = await Collection.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        });

        if (!collection) {
            return res.status(404).json({ message: "Collection not found." });
        }

        return res.status(200).json({ message: "Collection deleted." });
    } catch (error) {
        console.error("Delete collection error:", error);
        return res.status(500).json({ message: "Failed to delete collection." });
    }
};
