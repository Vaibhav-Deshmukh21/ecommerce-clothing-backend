import User from "../model/usermodel.js"
const getcurrentUser=async(req,res)=>{
    try{
const user=await User.findById(req.userId).select("-password")
if(!user){
    return res.status(404).json({massage:"User not found"});
}
return res.status(200).json(user)
    }
    catch(error){
console.log(error);
return res.status(500).json({massage:`getcurrentUser error ${error}`});
    }
}

export const getAdmin= async(req,res)=>{
try{
let adminEmail=req.adminEmail  
if(!adminEmail){
    return res.status(404).json({message:"User not Found"})
}
return res.status(201).json({email:adminEmail,
    role:"admin"
})
}
catch(error){
console.log(error);
return res.status(500).json({massage:`getadmin error ${error}`});

}
}





export default getcurrentUser;