// routes/adminRoutes.js
import express from "express";
import { getDashboardStats ,getAdminProfile,updateAdminProfile ,changeAdminPassword} from "../Controller/adminController.js";
import isauth from "../middleware/isAuth.js";
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();
import upload from "../middleware/multer.js";
router.get("/dashboard", adminAuth, getDashboardStats);
router.get("/dashboard/profile", adminAuth, getAdminProfile);
router.put("/dashboard/profile", adminAuth, upload.single("profilePic"), updateAdminProfile);
router.put("/dashboard/password", adminAuth, changeAdminPassword);
export default router;