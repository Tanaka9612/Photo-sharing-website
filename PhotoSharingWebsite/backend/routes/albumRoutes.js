import express from "express";
import {
    createAlbum,
    deleteAlbum,
    getAlbum,
    getAlbums,
    updateAlbum
} from "../controllers/albumController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getAlbums);
router.post("/", createAlbum);
router.get("/:id", getAlbum);
router.put("/:id", updateAlbum);
router.delete("/:id", deleteAlbum);

export default router;
