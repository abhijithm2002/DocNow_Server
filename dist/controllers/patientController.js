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
const patientService_1 = __importDefault(require("../services/patient/patientService"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const doctorService_1 = __importDefault(require("../services/doctor/doctorService"));
class patientController {
    constructor() {
        this._patientService = new patientService_1.default();
        this._doctorService = new doctorService_1.default();
    }
    signupPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Entered signupPatient controller method');
            try {
                const { name, email, mobile, address, gender, password, photo, is_verified, role } = req.body;
                console.log("Signup payload:", req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { name, email, address, mobile, gender, password: hashedPassword, photo, role };
                const userData = yield this._patientService.signupPatient(data);
                return res.status(201).json({
                    message: "User data collected, proceed with OTP verification",
                    email,
                    data
                });
            }
            catch (error) {
                console.error('Error in signupPatient:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    editPatient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('coming to edit patient controller');
            try {
                const { name, email, photo, mobile, gender } = req.body;
                console.log('body data', req.body);
                const userData = { name, email, photo, mobile, gender };
                const data = yield this._patientService.editPatient(userData);
                return res.status(200).json({ message: "Profile Updated", name, email, photo, mobile });
            }
            catch (error) {
                console.error('Error in editprofile:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    fetchDoctorDetails(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entered fetchDoctorDetails controller");
            try {
                const { id } = req.query;
                console.log(id);
                const data = yield this._patientService.fetchDoctorDetails(id);
                if (data) {
                    return res.status(200).json({ message: "doctor details fetched successfull", data });
                }
                else {
                    return res.status(400).json({ message: 'fetching doctor details  Unsuccessfull' });
                }
            }
            catch (error) {
                console.error('Error in fetching doctor details :', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    fetchSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered user fetchSlots controller');
            try {
                const { id, date } = req.query;
                console.log('id', id);
                console.log('date...', date);
                const slots = yield this._doctorService.fetchSlots(id, date);
                if (slots) {
                    return res.status(200).json({ message: 'slot fetched successfully', slots });
                }
                else {
                    return res.status(400).json({ message: 'slot fetched unsuccessfull' });
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = patientController;
