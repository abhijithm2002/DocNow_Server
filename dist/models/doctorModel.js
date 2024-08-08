"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const doctorSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, default: '' },
    expertise: { type: String, default: '' },
    education: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    languageKnown: { type: String, default: '' },
    mobile: { type: String, default: '' },
    gender: { type: String, default: '' },
    role: { type: String },
    currentWorkingHospital: { type: String, default: '' },
    is_verified: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    is_admin: { type: Boolean, default: false },
    documents_verified: { type: Boolean, default: false },
    workingHospitalContact: { type: String, default: '' },
    experienceYears: { type: Number, default: 0 },
    medicalLicenseNo: { type: String, default: '' },
    documents: [],
    workingDays: { type: String, default: '' },
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
    },
    photo: { type: String, default: '' }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Doctors', doctorSchema);
