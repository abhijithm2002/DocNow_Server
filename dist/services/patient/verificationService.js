"use strict";
// import nodemailer from 'nodemailer';
// import otpGenerator from 'otp-generator';
// import dotenv from 'dotenv';
// import { join } from 'path';
// import verificationRepository from '../../repositories/verificationRepository';
// import { IverficationService } from './interfaces/IverificationService';
// import { Patient } from '../../models/userModel';
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
// dotenv.config({ path: join(__dirname, '../../../.env') });
// export default class VerificationService implements IverficationService {
//     private _verificationRepository: verificationRepository;
//     constructor() {
//         this._verificationRepository = new verificationRepository();
//     }
//     private transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.USER_MAIL,
//             pass: process.env.PASS,
//         },
//     });
//     // async otpverify(email: string): Promise<Patient | null> {
//     //     console.log('entered verificationservice otpverify');
//     //     try {
//     //         const userData = await this._verificationRepository.otpverify(email);
//     //         if (userData) {
//     //             userData.is_verified = true;
//     //             await userData.save();
//     //             return userData;
//     //         } else {
//     //             return null;
//     //         }
//     //     } catch (error) {
//     //         throw error;
//     //     }
//     // }
//     async otpverify(email: string, enteredOtp: string): Promise<boolean> {
//         console.log('entered verificationservice otpverify');
//         try {
//             return await this._verificationRepository.verifyOtp(email, enteredOtp);
//         } catch (error) {
//             throw error;
//         }
//     }
//     public async SendOtpEmail(to: string, subject: string, otp: string): Promise<void> {
//         console.log('entered verificationservice SendOtpEmail');
//         const mailOptions = {
//             from: process.env.USER_EMAIL!,
//             to,
//             subject,
//             text: `Your OTP code is ${otp}`,
//             html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
//         };
//         try {
//             await this._verificationRepository.storeOtp(to, otp);
//             await this.transporter.sendMail(mailOptions);
//             console.log('OTP Email sent successfully', otp);
//         } catch (error) {
//             console.error('Error sending OTP Email', error);
//             throw new Error('Failed to send OTP Email');
//         }
//     }
//     // public async SendOtpEmail(to: string, subject: string, otp: string): Promise<void> {
//     //     const mailOptions = {
//     //         from: process.env.USER_MAIL!,
//     //         to,
//     //         subject,
//     //         text: `Your OTP code is ${otp}`,
//     //         html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
//     //     };
//     //     try {
//     //         await this.transporter.sendMail(mailOptions);
//     //         console.log('OTP Email sent successfully',otp);
//     //     } catch (error) {
//     //         console.error('Error sending OTP Email', error);
//     //         throw new Error('Failed to send OTP Email');
//     //     }
//     // }
//     public generateOtp(): string {
//         const otp = otpGenerator.generate(4, {
//             upperCaseAlphabets: false,
//             lowerCaseAlphabets: false,
//             specialChars: false,
//         });
//         console.log('Generated OTP:', otp);
//         return otp;
//     }
// }
const nodemailer_1 = __importDefault(require("nodemailer"));
const otp_generator_1 = __importDefault(require("otp-generator"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const verificationRepository_1 = __importDefault(require("../../repositories/verificationRepository"));
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../../.env') });
class VerificationService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS,
            },
        });
        this._verificationRepository = new verificationRepository_1.default();
    }
    verifyOtp(email, enteredOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered verificationservice verifyOtp');
            try {
                return yield this._verificationRepository.verifyOtp(email, enteredOtp);
            }
            catch (error) {
                throw error;
            }
        });
    }
    sendOtpEmail(to, subject, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered verificationservice sendOtpEmail');
            const mailOptions = {
                from: process.env.USER_MAIL,
                to,
                subject,
                text: `Your OTP code is ${otp}`,
                html: `<p>Your OTP code is <strong>${otp}</strong></p>`,
            };
            try {
                yield this._verificationRepository.storeOtp(to, otp);
                yield this.transporter.sendMail(mailOptions);
                console.log('OTP Email sent successfully', otp);
            }
            catch (error) {
                console.error('Error sending OTP Email', error);
                throw new Error('Failed to send OTP Email');
            }
        });
    }
    patientLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered verificationservice patientLogin');
            try {
                const userData = yield this._verificationRepository.patientLogin(email);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    doctorLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(' entered doctorLogin verificationService');
            try {
                const userData = yield this._verificationRepository.existingDoctor(email);
                return userData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    adminLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered admin login verification service');
            try {
                const adminData = yield this._verificationRepository.adminLogin(email);
                return adminData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    generateOtp() {
        const otp = otp_generator_1.default.generate(4, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log('Generated OTP:', otp);
        return otp;
    }
}
exports.default = VerificationService;
