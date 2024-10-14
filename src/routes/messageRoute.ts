import { Router } from "express";
import messageController from "../controllers/messageController";

const router = Router();
const MessageController = new messageController()

router.post('/send/:id/senderId', MessageController.sendMessage.bind(MessageController))


export const messageRoutes = router