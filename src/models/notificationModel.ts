import mongoose, { Document, Schema } from "mongoose";

export interface INotifications extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    createdAt: Date;
    message: string;
    isRead: boolean; 
}

const notificationSchema: Schema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true,
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patients',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false, 
    },
});

const Booking = mongoose.model<INotifications>("Notification", notificationSchema);
export default Booking;
