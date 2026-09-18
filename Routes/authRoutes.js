import express from "express";
import { adminLogin,adminLogout, googleSignin, login, userLogout, registeration } from "../Controller/authController.js";


const authRoutes=express.Router();

authRoutes.post("/registeration",registeration)
authRoutes.post("/login",login)
authRoutes.post("/userLogout", userLogout); // change from GET to POST
authRoutes.post("/googleSignin",googleSignin)
authRoutes.post("/adminlogin",adminLogin)
authRoutes.post("/adminLogout", adminLogout);

export default authRoutes;

