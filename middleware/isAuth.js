import jwt from "jsonwebtoken"
const isauth=async (req,res,next) => {
    try{
let tokan=req.cookies.userToken;

if(!tokan){
    return res.status(400).json({massage:"user does not have token"})
}
let verifyToken=await jwt.verify(tokan,process.env.JWT_SECRET);
if (!verifyToken) {
    return res.status(401).json({ message: "Unauthorized" })
}
req.userId=verifyToken.userId;
next();
    }
    catch(error){
        console.log("isAuth error");
return  res.status(500).json({massage:`isAuth Error ${error}`})
    }
}
export default isauth;