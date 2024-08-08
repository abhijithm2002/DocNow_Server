"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const verificationController_1 = __importDefault(require("../controllers/verificationController"));
const doctorController_1 = __importDefault(require("../controllers/doctorController"));
const router = (0, express_1.Router)();
const DoctorController = new doctorController_1.default();
const verificationController = new verificationController_1.default();
router.post('/doctor-register', DoctorController.signupDoctor.bind(DoctorController));
router.post('/otp-generator', verificationController.generateOtp.bind(verificationController));
router.post('/otp-verify', verificationController.otpverify.bind(verificationController));
router.post('/resend-otp', verificationController.resendOtp.bind(verificationController));
router.post('/doctor-login', verificationController.doctorLogin.bind(verificationController));
router.post('/google-login', verificationController.doctorGoogleLogin.bind(verificationController));
exports.doctorRoutes = router;
