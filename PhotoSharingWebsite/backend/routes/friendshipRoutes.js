import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "Get friends"
    });
});

router.get("/requests", (req, res) => {
    res.json({
        message: "Get friend requests"
    });
});

router.post("/request/:userId", (req, res) => {
    res.json({
        message: "Send friend request"
    });
});

router.put("/accept/:userId", (req, res) => {
    res.json({
        message: "Accept friend request"
    });
});

router.delete("/:userId", (req, res) => {
    res.json({
        message: "Remove friend"
    });
});

export default router;