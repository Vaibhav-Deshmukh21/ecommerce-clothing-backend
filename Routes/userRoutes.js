import express from "express";
import getcurrentUser from "../Controller/userController.js";
import { getAdmin } from "../Controller/userController.js";
import isauth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js"
const userRouter=express.Router();

userRouter.get("/getcurrentUser",isauth,getcurrentUser)
userRouter.get("/getadmin",adminAuth,getAdmin)

export default userRouter;