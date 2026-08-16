import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";

import {
  getMessages,
  sendMessage,
  getChatPartners,
  getUser,
} from "../controllers/message.controller.js";

const router = express.Router();

router.use(protectRoute, arcjetProtection);

router.get("/contacts/:email", getUser);
router.get("/chats", getChatPartners);
router.route("/:id").get(getMessages).post(sendMessage);

export default router;
