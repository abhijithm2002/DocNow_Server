"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageModel_1 = __importDefault(require("../models/messageModel"));
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const mongoose_1 = require("mongoose");
class MessageRepository {
    sendMessage(id, senderId, message, messageType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const receiverId = new mongoose_1.Types.ObjectId(id);
                const senderObjectId = new mongoose_1.Types.ObjectId(senderId);
                const newMessage = new messageModel_1.default({
                    conversationId: null,
                    senderId: senderObjectId,
                    recieverId: receiverId,
                    messageType,
                    message
                });
                let conversation = yield conversationModel_1.default.findOne({
                    participants: { $all: [senderObjectId, receiverId] }
                });
                if (!conversation) {
                    conversation = yield conversationModel_1.default.create({
                        participants: [senderObjectId, receiverId],
                        lastMessage: newMessage._id
                    });
                }
                newMessage.conversationId = conversation._id;
                conversation.lastMessage = newMessage._id;
                yield Promise.all([newMessage.save(), conversation.save()]);
                return newMessage;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getConversationByParticipant(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield conversationModel_1.default.find({
                    participants: id,
                }).populate('lastMessage');
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = MessageRepository;
/// ivdnn thodaganam
