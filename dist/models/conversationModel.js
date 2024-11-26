"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const conversationSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Patients'
        }
    ],
    messages: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ],
    lastMessage: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Message', // Reference to Message model
        required: false // Optional, depending on if you want this to be required
    },
}, { timestamps: true });
const Conversation = (0, mongoose_1.model)('Conversation', conversationSchema);
exports.default = Conversation;
// // Conversation Model
// const conversationSchema = new Schema({
//     participants: [
//         { type: Schema.Types.ObjectId, ref: 'Users' }
//     ],
//     lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },
// }, { timestamps: true });
// const Conversation = mongoose.model('Conversation', conversationSchema);
// // Message Model
// const messageSchema = new Schema({
//     conversationId: { type: Schema.Types.ObjectId, ref: 'Conversation', required: true },
//     senderId: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
//     messageType: { type: String, enum: ['text', 'voice', 'image'], required: true },
//     message: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// }, { timestamps: true });
// const Message = mongoose.model('Message', messageSchema);
