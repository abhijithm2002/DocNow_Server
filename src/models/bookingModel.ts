import mongoose,{Document, Schema} from "mongoose";
import {ISlot} from './slotModel'

export interface BookingAndSlots {
    List: IBooking[];
    Slot: ISlot[];
}

export interface IBooking extends Document {
    doctorId: mongoose.Types.ObjectId;
    patientId: mongoose.Types.ObjectId;
    date: Date;
    shift: string;
    status: string;
    payment: {
        chargeId: string | null;
        paymentId: string | null;
        amount: number | null;
        status: string;
    }
}

const bookingSchema: Schema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    patientId: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    shift: {
        type: String,
        required: true
    },
    status: {
        type : String,
        default: 'Active'
    },
    payment: {
        chargeId: {
            type: String,
            default: null
        },
        paymentId: {
            type: String,
            default: null
        },
        amount : {
            type: Number,
            default: null
        },
        status: {
            type: String,
            default: 'Paid'
        }
    }
},{ timestamps: true})

const Booking = mongoose.model<IBooking>("Booking",bookingSchema);
export default Booking;