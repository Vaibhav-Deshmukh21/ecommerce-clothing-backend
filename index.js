import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDb from "./Config/db.js";

import authRoutes from "./Routes/authRoutes.js";
import productRoute from "./Routes/productRoute.js";
import orderRoute from "./Routes/OrderRoute.js";
import userRouter from "./Routes/userRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import contactRoute from "./Routes/contactRoute.js";
import swaggerUi from "swagger-ui-express";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

const swaggerDocument = JSON.parse(
  fs.readFileSync("./openapi.json", "utf-8")
);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRouter);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api", adminRoutes);
app.use("/api/contact", contactRoute);

// Home route
app.get("/", (req, res) => {
  res.send("Hello From Server  ");
});
// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Connect database
connectDb();