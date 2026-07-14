import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getProfile,
  followUser,
  unfollowUser
} from "../controllers/userController.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);

router.put("/follow/:id", authMiddleware, followUser);

router.put("/unfollow/:id", authMiddleware, unfollowUser);

export default router;