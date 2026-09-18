import express from "express";
import {
  sendContactMessage,
  getAllMessages,
  getUnreadMessagesCount
} from "../Controller/contactController.js";
import isauth from "../middleware/isAuth.js";

const router = express.Router();

// SEND MESSAGE
router.post("/send", sendContactMessage);

// GET ALL MESSAGES (ADMIN)
router.get("/getAllMessages",isauth, getAllMessages);
router.get("/getUnreadMessagesCount",isauth, getUnreadMessagesCount);
router.put("/getUnreadMessagesCount/:id",isauth, getUnreadMessagesCount);

export default router;