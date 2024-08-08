import { Router } from "express";
import VerificationController from "../controllers/verificationController";
import doctorController from "../controllers/doctorController";

const router = Router();
const DoctorController = new doctorController();
const verificationController = new VerificationController();

router.post('/doctor-register', DoctorController.signupDoctor.bind(DoctorController));
router.post('/otp-generator', verificationController.generateOtp.bind(verificationController));
router.post('/otp-verify', verificationController.otpverify.bind(verificationController));
router.post('/resend-otp', verificationController.resendOtp.bind(verificationController))
router.post('/doctor-login', verificationController.doctorLogin.bind(verificationController))
router.post('/google-login', verificationController.doctorGoogleLogin.bind(verificationController))

export const doctorRoutes = router;
