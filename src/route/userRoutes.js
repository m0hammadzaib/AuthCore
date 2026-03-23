import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getCurrentUser from "../controllers/userController.js";
import isAdmin from "../middleware/isAdmin.js";
import pool from "../config/db.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();


router.get("/me", authMiddleware, getCurrentUser);


router.get("/all", authMiddleware, isAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email, username, role ,password FROM users WHERE is_deleted = false"
        );

        res.json({
            users: result.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/delete", authMiddleware, deleteUser);

export default router;
