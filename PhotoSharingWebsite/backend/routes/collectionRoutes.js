import express from "express";
import {
    createCollection,
    deleteCollection,
    getCollections,
    toggleCollectionPost
} from "../controllers/collectionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/",protect, getCollections);
router.post("/", protect, createCollection);
router.post("/:id/posts/:postId",protect, toggleCollectionPost);
router.delete("/:id",protect, deleteCollection);

export default router;
