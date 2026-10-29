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
router.get("/", getCollections);
router.post("/", createCollection);
router.post("/:id/posts/:postId", toggleCollectionPost);
router.delete("/:id", deleteCollection);

export default router;
