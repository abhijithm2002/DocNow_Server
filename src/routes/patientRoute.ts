import { Router } from 'express';
import patientController from '../controllers/patientController';
import { parseArgs } from 'util';
import VerificationController from '../controllers/verificationController';
import { refreshAccessToken } from '../middleware/authMiddleware';
import protect from '../middleware/authMiddleware'


const router = Router();
const PatientController = new patientController();
const verificationController = new VerificationController()

router.post('/user_register', PatientController.signupPatient.bind(PatientController));
router.post('/otp-generator', verificationController.generateOtp.bind(verificationController))
router.post('/otp-verify', verificationController.otpverify.bind(verificationController))
router.post('/resend-otp', verificationController.resendOtp.bind(verificationController))
router.post('/login', verificationController.patientLogin.bind(verificationController))
router.post('/google-login', verificationController.googleLogin.bind(verificationController));
router.post('/refresh-token', refreshAccessToken)
router.patch('/edit-profile',protect, PatientController.editPatient.bind(PatientController))
router.get('/fetchDoctorDetails', protect, PatientController.fetchDoctorDetails.bind(PatientController))
router.get('/fetchSlots', PatientController.fetchSlots.bind(PatientController))

export const patientRoutes = router;
