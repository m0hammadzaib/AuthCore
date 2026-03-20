import express from "express"
import authMiddleware from "../middleware/authMiddleware.js"
import getCurrentUser from "../controllers/userController.js"

const router = express.Router()

router.get("/me", authMiddleware,(req,res)=>{
   res.json({
    message:"Protected route accessed",
    user:req.user
   }), getCurrentUser
})

export default router