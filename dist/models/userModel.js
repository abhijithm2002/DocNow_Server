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
    favourite_doctors: [
        { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Doctors' }
    ],
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
    Wallet: { type: Number, default: 0 },
    WalletHistory: [
        {
            date: {
                type: Date,
                default: Date.now
            },
            amount: {
                type: Number,
                default: 0
            },
            message: {
                type: String,
                default: 'Initial Entry'
            }
        }
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Patients", userSchema);
