import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Get posts"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        message: "Get single post"
    });
});

router.post("/", (req, res) => {
    res.json({
        message: "Create post"
    });
});

router.put("/:id", (req, res) => {
    res.json({
        message: "Update post"
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        message: "Delete post"
    });
});

export default router;