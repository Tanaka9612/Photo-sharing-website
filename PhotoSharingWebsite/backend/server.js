import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import friendshipRoutes from "./routes/friendshipRoutes.js";
import feedRoutes from "./routes/feedRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/friends", friendshipRoutes);
app.use("/api/feed", feedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "FrameFlow API is running"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`FrameFlow server running on port ${PORT}`);
});