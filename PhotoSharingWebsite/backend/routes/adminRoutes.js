import express from "express";

import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

import {
    getAllUsers,
    getAllPosts,
    deleteUser,
    deletePost
} from "../controllers/adminController.js";


const router = express.Router();


// All routes below require:
// 1. Login
// 2. Admin role

router.use(protect);
router.use(adminOnly);


// Users

router.get("/users", getAllUsers);

router.delete(
    "/users/:id",
    deleteUser
);


// Posts

router.get("/posts", getAllPosts);

router.delete(
    "/posts/:id",
    deletePost
);


export default router;