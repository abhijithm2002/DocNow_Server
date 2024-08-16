"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const verificationController_1 = __importDefault(require("../controllers/verificationController"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const router = (0, express_1.Router)();
const verificationController = new verificationController_1.default();
const AdminController = new adminController_1.default();
router.post('/admin-login', verificationController.adminLogin.bind(verificationController));
router.get('/fetchUserList', AdminController.fetchUserList.bind(AdminController));
router.patch('/patient/:userId/blockUnblock', AdminController.blockUnblockPatient.bind(AdminController));
router.patch('/doctor/:userId/blockUnblock', AdminController.blockUnblockDoctor.bind(AdminController));
router.get('/fetchDoctorList', AdminController.fetchDoctorList.bind(AdminController));
router.patch('/doctor/:doctorId/verify', AdminController.verifyDocuments.bind(AdminController));
exports.adminRoutes = router;
