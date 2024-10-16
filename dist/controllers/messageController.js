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
const messageService_1 = __importDefault(require("../services/message/messageService"));
const path_1 = __importDefault(require("path"));
const cloudinary_1 = require("../utils/cloudinary");
class messageController {
    constructor() {
        this._messageService = new messageService_1.default();
    }
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered sendmessage');
            try {
                const { message } = req.body;
                const { id, senderId } = req.params;
                console.log("message", message);
                console.log("id", id);
                console.log("senderid", senderId);
                const files = req.files;
                let messageType = 'text';
                let messageContent = message;
                if (files.voiceMessage && files.voiceMessage[0]) {
                    const voicePath = path_1.default.join(__dirname, "../public/voicemessages", files.voiceMessage[0].filename);
                    messageContent = yield (0, cloudinary_1.uploadVoiceMessageToCloudinary)(voicePath);
                }
                else if (files.image && files.image[0]) {
                    messageType = "image";
                    const imagePath = path_1.default.join(__dirname, "../public/images", files.image[0].filename);
                    messageContent = yield (0, cloudinary_1.uploadImageToCloudinary)(imagePath);
                }
                const data = yield this._messageService.sendMessage(id, senderId, messageContent, messageType);
                return res.status(200).json({ newMessage: data });
            }
            catch (error) {
                return res.status(500).json({ message: "Internal Error" });
            }
        });
    }
    getConversations(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered get conversation controller');
            try {
                const { id } = req.query;
                let conversation = yield this._messageService.getConversationByParticipant(id);
                return res.json({ conversation });
            }
            catch (error) {
                res.status(500).json({ message: 'internal Error' });
            }
        });
    }
}
exports.default = messageController;
