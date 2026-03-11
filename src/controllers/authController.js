import pool from "../config/db.js"

export const registerUser = async (req,res)=>{
    try{
        const {email,username,password} = req.body

        const result = await pool.query(
            "INSERT INTO users (email, username, password) VALUES ($1,$2,$3) RETURNING * ",[email,username,password]
        )
    }
}