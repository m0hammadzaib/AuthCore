import pool from "../config/db.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters"
            });
        }

        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND is_deleted = false",
            [email]
        );

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                error: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await pool.query(
            `INSERT INTO users (email, username, password, role)
             VALUES ($1, $2, $3, $4)
             RETURNING id, email, username, role, created_at`,
            [email, username, hashedPassword, "user"]
        );

        res.status(201).json({
            message: "User registered successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1 AND is_deleted = false",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid credentials"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
};



export default registerUser;
