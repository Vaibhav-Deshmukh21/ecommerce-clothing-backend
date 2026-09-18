import jwt from "jsonwebtoken"
export const genToken=async(userId)=>{
    try{
const userToken=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"})
return userToken;
    }
    catch(error){
        console.log("tokan Error");
        
    }
}

export const genToken1=async(email)=>{
    try{
const adminToken=await jwt.sign({email},process.env.JWT_SECRET,{expiresIn:"7d"})
return adminToken;
    }
    catch(error){
        console.log("tokan Error");
        
    }
}