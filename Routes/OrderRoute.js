import express from "express";
import { placeOrder,userorder,trackOrder,updateOrderStatus,getAllOrders } from "../Controller/orderController.js";
import isAuth from "../middleware/isAuth.js"
import adminAuth from "../middleware/adminAuth.js"
const router = express.Router();

router.post("/placeOrder",isAuth, placeOrder);
router.post("/userorder",isAuth, userorder);
router.get("/track/:id", isAuth, trackOrder)
router.put("/status",adminAuth,updateOrderStatus)
router.get("/all", adminAuth, getAllOrders);
export default router;  
