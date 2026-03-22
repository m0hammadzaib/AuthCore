import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import getCurrentUser from "../controllers/userController.js"
import isAdmin from "../middleware/isAdmin.js"
import pool from "../config/db.js"

const router = express.Router()

router.get("/me", authMiddleware,(req,res)=>{
   res.json({
    message:"Protected route accessed",
    user:req.user
   }), getCurrentUser
})

router.get("/all",authMiddleware,isAdmin, async (res,req)=>{
   try{
      const result = await pool.query("SELECT id,email,username,role FROM user WHERE is_deleted = false");

      res.json({
         user:result.rows
      })
   }catch(error){
         res.status(500).json({error:"Server Error"})
   }
})

export default router