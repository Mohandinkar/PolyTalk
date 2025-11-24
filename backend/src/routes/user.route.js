import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { getRecommendedUsers, getMyFriends, sendFriendRequest } from "../controller/user.controller.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", getRecommendedUsers);
router.get("/friend", getMyFriends);
router.post("friend-request/:id", sendFriendRequest);

export default router;