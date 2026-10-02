import express from "express";

const router = express.Router();

router.delete("/users/:id", (req, res) => {
    res.json({
        message: "Admin delete user"
    });
});

router.delete("/posts/:id", (req, res) => {
    res.json({
        message: "Admin delete post"
    });
});

router.get("/reports", (req, res) => {
    res.json({
        message: "Admin reports"
    });
});

export default router;