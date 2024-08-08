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
const adminService_1 = __importDefault(require("../services/admin/adminService"));
class adminController {
    constructor() {
        this._adminService = new adminService_1.default();
        this._verificationService = new verificationService_1.default();
    }
    fetchUserList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchuserlist admin controller');
            try {
                const data = yield this._adminService.fetchUserList();
                return res.status(200).json({ data });
            }
            catch (error) {
                throw error;
            }
        });
    }
    blockUnblockPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                console.log(status);
                const { userId } = req.params;
                console.log(userId);
                const data = yield this._adminService.blockUnblockPatient(userId, status);
                if (data) {
                    return res.status(200).json({ message: `Patient ${status ? 'blocked' : 'unblocked'} successfully`, data });
                }
                else {
                    return res.status(500).json({ message: 'Internal server error' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    blockUnblockDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status } = req.body;
                console.log(status);
                const { userId } = req.params;
                console.log(userId);
                const data = yield this._adminService.blockUnblockDoctor(userId, status);
                if (data) {
                    return res.status(200).json({ message: `Patient ${status ? 'blocked' : 'unblocked'} successfully`, data });
                }
                else {
                    return res.status(500).json({ message: 'Internal server error' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchDoctorList(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered doctorlist admin controller');
            try {
                const doctorData = yield this._adminService.fetchDoctorList();
                return res.status(200).json({ doctorData });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = adminController;
