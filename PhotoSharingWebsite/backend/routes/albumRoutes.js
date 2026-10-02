import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Get albums"
    });
});

router.get("/:id", (req, res) => {
    res.json({
        message: "Get album"
    });
});

router.post("/", (req, res) => {
    res.json({
        message: "Create album"
    });
});

router.put("/:id", (req, res) => {
    res.json({
        message: "Update album"
    });
});

router.delete("/:id", (req, res) => {
    res.json({
        message: "Delete album"
    });
});

export default router;