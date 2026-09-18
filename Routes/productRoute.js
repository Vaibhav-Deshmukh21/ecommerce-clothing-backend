import express from "express";
import upload from "../middleware/multer.js";
import addProduct, { deleteProducts, getproduct, updateProduct } from "../Controller/addProduct.js"
import adminAuth from "../middleware/adminAuth.js";
const router = express.Router();

router.post(
  "/add",  
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 }
  ]),
  addProduct
);

router.get("/getP",getproduct);
router.delete("/deleteP/:id",adminAuth,deleteProducts);
router.patch("/pUpdate/:id", upload.fields([
  { name: "image1" }, 
  { name: "image2" }, 
  { name: "image3" }, 
  { name: "image4" }
]), updateProduct);
export default router;