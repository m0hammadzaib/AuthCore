import pool from "../config/db";

const getCurrentUser= async (req,res)=>{
    try{
        const userID = req.user.id;

        const result = await pool.query(
            'SELECT id,email,username,role,created_at FROM users WHERE id=$1 AND is_deleted = false ',[userID]
        );
        if(result.rows.length===0){
            return res.status(404).json({
                error:"User not found"
            })
        }
        res.status(200).json({
            user:result.rows[0]
        })
    }catch(err){
           console.log(err)
           res.status(500).json({
             error:"Server error"
           })
    }
}

export default getCurrentUser