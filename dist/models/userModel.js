"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number },
    photo: { type: String, default: '' },
    is_admin: { type: Boolean, default: false },
    is_doctor: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    gender: { type: String },
    role: { type: String },
    is_verified: { type: Boolean, default: false },
    favourite_doctors: [{
            id: { type: String },
            name: { type: String },
            specialization: { type: String }
        }],
    appointments: [{
            id: { type: String }
        }],
    notifications: [{
            id: { type: String }
        }],
    address: {
        address: { type: String },
        pincode: { type: Number },
        state: { type: String },
        country: { type: String }
    }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Patients", userSchema);
