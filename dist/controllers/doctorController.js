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
const verificationService_1 = __importDefault(require("../services/patient/verificationService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const doctorService_1 = __importDefault(require("../services/doctor/doctorService"));
class doctorController {
    constructor() {
        this._doctorService = new doctorService_1.default();
        this._verificationService = new verificationService_1.default;
    }
    signupDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('came to signupdoctor controller');
            try {
                const { name, email, mobile, address, gender, password, photo, is_verified, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown } = req.body;
                console.log('details body: ', req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { name, email, address, mobile, gender, password: hashedPassword, photo, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown };
                const userData = yield this._doctorService.signupDoctor(data);
                return res.status(201).json({
                    message: "User data collected, proceed with OTP verification",
                    email,
                    data
                });
            }
            catch (error) {
            }
        });
    }
}
exports.default = doctorController;
