"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const conversationSchema = new mongoose_1.Schema({
    participants: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Patients'
        }
    ],
    lastMessage: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Message' }
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
