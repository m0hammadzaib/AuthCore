import jwt from 'jsonwebtoken'

export function authMiddleware(res,req,next){

    const token = req.headers.authrorization

    if(!token){
        return res.status(401).json({message:"No token"})
    }
    try{
        const decoded = jwt.verify(token, provess.env.JWT_SECRET)

        req.user = decoded
        
        next()
    }catch(err){
        res.status(401).json({message:"Invalid token"})
    }
}