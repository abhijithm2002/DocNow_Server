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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRoutes = void 0;
const express_1 = require("express");
const verificationController_1 = __importDefault(require("../controllers/verificationController"));
const doctorController_1 = __importDefault(require("../controllers/doctorController"));
const authDoctor_1 = __importStar(require("../middleware/authDoctor"));
const router = (0, express_1.Router)();
const DoctorController = new doctorController_1.default();
const verificationController = new verificationController_1.default();
router.post('/doctor-register', DoctorController.signupDoctor.bind(DoctorController));
router.post('/otp-generator', verificationController.generateOtp.bind(verificationController));
router.post('/otp-verify', verificationController.otpverify.bind(verificationController));
router.post('/resend-otp', verificationController.resendOtp.bind(verificationController));
router.post('/doctor-login', verificationController.doctorLogin.bind(verificationController));
router.post('/google-login', verificationController.doctorGoogleLogin.bind(verificationController));
router.patch('/edit-profile', authDoctor_1.default, DoctorController.editDoctor.bind(DoctorController));
router.patch('/uploadDocuments', authDoctor_1.default, DoctorController.uploadDocuments.bind(DoctorController));
router.post('/updateSlots', authDoctor_1.default, DoctorController.updateSlots.bind(DoctorController));
router.get('/fetchSlots', authDoctor_1.default, DoctorController.fetchSlots.bind(DoctorController));
router.patch('/deleteSlots', authDoctor_1.default, DoctorController.deleteSlots.bind(DoctorController));
router.get('/getDocuments', authDoctor_1.default, DoctorController.fetchDocuments.bind(DoctorController));
router.get('/fetchAppointments/:doctorId', authDoctor_1.default, DoctorController.fetchAppointments.bind(DoctorController));
router.get('/wallet-history/:doctorId', authDoctor_1.default, DoctorController.getWalletHistory.bind(DoctorController));
router.post('/refresh-token', authDoctor_1.refreshAccessTokenDoctor);
exports.doctorRoutes = router;
