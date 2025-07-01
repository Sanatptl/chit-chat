import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getUsersList,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersList);
router.get("/user/:id", protectRoute, getMessages);

router.post("/send/:id", protectRoute, sendMessage);

export default router;
