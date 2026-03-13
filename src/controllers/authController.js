import pool from "../config/db.js"

const registerUser = async (req,res)=>{
    try{
        const {email,username,password} = req.body
        
        const result = await pool.query(
            "INSERT INTO users (email, username, password) VALUES ($1,$2,$3) RETURNING * ",[email,username,password]
        )
        res.status(201).json({
            message:"User registered",
            user : result.rows[0]
        })
    }catch(error){
        console.log(error)
        res.status(500).json({error:"Server error"})
    }
}

export default registerUser