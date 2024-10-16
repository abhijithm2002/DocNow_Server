import mongoose,{Document, model, Model, Schema} from "mongoose";

export interface IConversation extends Document {
    participants: mongoose.Types.ObjectId[],
    messages: mongoose.Types.ObjectId[],
}

const conversationSchema: Schema<IConversation> = new Schema({
    participants: [
        {
            type: Schema.Types.ObjectId,
            ref:'Patients'
        }
    ],
    messages: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message',
            default: []
        }
    ]
},{timestamps: true})


const Conversation: Model<IConversation> = model<IConversation>('Conversation',conversationSchema);
export default Conversation;


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
