"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRoutes = void 0;
const express_1 = require("express");
const messageController_1 = __importDefault(require("../controllers/messageController"));
const router = (0, express_1.Router)();
const MessageController = new messageController_1.default();
router.post('/send/:id/senderId', MessageController.sendMessage.bind(MessageController));
exports.messageRoutes = router;
