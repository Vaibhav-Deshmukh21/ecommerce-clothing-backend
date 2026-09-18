import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./Config/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/authRoutes.js";
import productRoute from "./Routes/productRoute.js"
import orderRoute from "./Routes/OrderRoute.js"  // you’re using config() to load environment variables from a .env file into your application.
import cors from "cors"
import userRouter from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import contactRoute from "./Routes/contactRoute.js";
let port=process.env.PORT || 6000
let app =express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173","http://localhost:5174"],  
  credentials: true
}));
app.use("/api/auth",authRoutes)
app.use("/api/user",userRouter)
app.use("/api/product",productRoute)
app.use("/api/order",orderRoute)
app.use("/api",adminRoutes)
app.use("/api/contact", contactRoute);
app.get("/",(req,res)=>{
   res.send("Hello From Server"); 
})
console.log(process.env.ADMIN_EMAIL);
app.listen(port,()=>{
    console.log("Hello form Server",port);
    connectDb();
})
