import express from "express";
import {
  checkAuth,
  getProfile,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);
router.get("/profile", getProfile);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);

export default router;
