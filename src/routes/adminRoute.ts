import { Router } from 'express';
import VerificationController from '../controllers/verificationController';
import adminController from '../controllers/adminController';
const router = Router();
const verificationController = new VerificationController();
const AdminController = new adminController()

router.post('/admin-login', verificationController.adminLogin.bind(verificationController));
router.get('/fetchUserList', AdminController.fetchUserList.bind(AdminController))
router.patch('/patient/:userId/blockUnblock', AdminController.blockUnblockPatient.bind(AdminController))
router.patch('/doctor/:userId/blockUnblock', AdminController.blockUnblockDoctor.bind(AdminController))
router.get('/fetchDoctorList', AdminController.fetchDoctorList.bind(AdminController))
export const adminRoutes = router;
