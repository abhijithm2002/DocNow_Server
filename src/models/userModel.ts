import mongoose ,{Document, model, Schema} from "mongoose";

export interface Doctor {
    id: string;
    name: string;
    specialization ?: string
}

export interface Appointment {
    id: string;
}

export interface Notification {
    id: string;
}


export interface Address {
    address : string;
    pincode : number;
    state : string;
    country : string;
}

export interface Patient extends Document {
    name?: string,
    email?: string,
    password?: string,
    mobile?: number,
    gender?: string,
    photo ?: string,
    _id ?: string,
    is_doctor?: boolean,
    is_admin?: boolean;
    is_blocked ?: boolean;
    is_verified ?: boolean;
    favourite_doctors ?: Doctor[];
    appointments ?: Appointment[];
    notifications ?: Notification[];
    address ?: Address;
    role: String;

}

const userSchema = new Schema<Patient> ({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String,required: true },
    mobile: {type: Number},
    photo: { type : String, default: ''},
    is_admin: {type: Boolean, default: false},
    is_doctor: { type: Boolean, default: false},
    is_blocked: { type: Boolean, default: false},
    gender: {type: String },
    role: {type: String},
    is_verified : {type : Boolean, default : false},
    favourite_doctors: [{
        id: { type: String},
        name: { type: String },
        specialization: { type: String }
    }],
    appointments : [{
        id: {type: String}
    }],
    notifications : [{
        id: {type: String}
    }],

    address : {
        address: {type: String},
        pincode: {type: Number},
        state: {type: String},
        country: {type: String}
    }
    


},{timestamps : true})

export default model<Patient>("Patients", userSchema)