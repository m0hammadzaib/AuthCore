import jwt from 'jsonwebtoken'

export function authMiddleware(res,req,next){
    
    const token = req.headers.authrorization
}