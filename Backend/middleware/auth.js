import jwt from "jsonwebtoken";


const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({
            success:false,
            message:"Not authorised user"
        })
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);        //jab token decode karoge to id milega
        req.body.userId=token_decode.id;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }

}

export default authMiddleware;