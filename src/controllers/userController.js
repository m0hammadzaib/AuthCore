import pool from "../config/db.js";

const getCurrentUser = async (req,res)=>{
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

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await pool.query(
            `UPDATE users 
             SET is_deleted = true 
             WHERE id = $1 
             RETURNING id, username, email`,
            [userId]
        );

        res.json({
            message: "Account deleted successfully",
            user: result.rows[0]
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Server error"
        });
    }
};




export default getCurrentUser