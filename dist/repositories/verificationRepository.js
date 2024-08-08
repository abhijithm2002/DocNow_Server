"use strict";
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
const otpModel_1 = __importDefault(require("../models/otpModel"));
const AppError_1 = __importDefault(require("../utils/AppError"));
const userModel_1 = __importDefault(require("../models/userModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
class verificationRepository {
    storeOtp(email, otp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield otpModel_1.default.create({ email, otp });
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyOtp(email, enteredOtp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered verify otp repository');
            try {
                const otpRecord = yield otpModel_1.default.findOne({ email }).sort({ createdAt: -1 }).exec();
                console.log('otpRecord: ', otpRecord);
                console.log('entered otp : ', enteredOtp);
                if (otpRecord && otpRecord.otp === enteredOtp) {
                    yield otpRecord.deleteOne();
                    return true;
                }
                else {
                    console.log('app error vannu');
                    throw new AppError_1.default('Enter the correct OTP', 400);
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    patientLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered patient login repository', email);
            try {
                console.log('/////////////////////////');
                console.log(email);
                console.log('typeeee:', typeof email);
                return yield userModel_1.default.findOne({ email }).exec();
            }
            catch (error) {
                console.log('patietlogin repo ////////// error');
                throw error;
            }
        });
    }
    existingDoctor(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered checking existing  doctor repository');
            try {
                return yield doctorModel_1.default.findOne({ email }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    adminLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered admin login repository');
            try {
                const adminData = yield userModel_1.default.findOne({ email, is_admin: true }).exec();
                return adminData;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = verificationRepository;
