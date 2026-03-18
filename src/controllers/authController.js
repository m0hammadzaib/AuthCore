import pool from "../config/db.js"
import hashPassword from "../utils/hashPassword.js"
import bcrypt from "bcrypt"


const registerUser = async (req,res)=>{
    try{
        const {email,username,password} = req.body

        if(!email || !password){
            return res.status(400).json({
                error:"Email and password are required"
            })
        }
        if(password.length <6){
           return res.status(400).json({
            error:"Password must be atleast 6 characters"
           })
        }

        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1",[email]
        )
        if(userExists.rows.length>0){
            return res.status(400).json({
                error :"User already exists"
            })
        }
        
        const hashedPassword = await bcrypt.hash(password,4);

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
        
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server error"});
    }
}

export default registerUser