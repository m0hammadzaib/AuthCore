import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import getCurrentUser from "../controllers/userController.js";
import isAdmin from "../middleware/isAdmin.js";
import pool from "../config/db.js";

const router = express.Router();

// ✅ Get current user
router.get("/me", authMiddleware, getCurrentUser);

// ✅ Admin: get all users
router.get("/all", authMiddleware, isAdmin, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, email, username, role FROM users WHERE is_deleted = false"
        );

        res.json({
            users: result.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
