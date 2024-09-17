import { Router } from "express";
import {
  createChat,
  getChats,
  getSpecificChat,
  updateChat,
} from "../controllers/chatsController";

const router = Router();

router.get("/", getChats);
router.get("/specific", getSpecificChat);
router.post("/", createChat);
router.patch("/", updateChat);

export default router;
