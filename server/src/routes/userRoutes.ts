import { Router } from "express";
import { createUser, getAllUsers, updateUser } from "../controllers/usersController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.patch("/", updateUser)

export default router;