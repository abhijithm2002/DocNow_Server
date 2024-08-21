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
                const { name, email, mobile, address, gender, password, photo, is_verified, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown, education } = req.body;
                console.log('details body: ', req.body);
                const hashedPassword = yield bcrypt_1.default.hash(password, 10);
                const data = { name, email, address, mobile, gender, password: hashedPassword, photo, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown, education };
                const userData = yield this._doctorService.signupDoctor(data);
                return res.status(201).json({
                    message: "User data collected, proceed with OTP verification",
                    email,
                    data
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    editDoctor(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entering edit doctor controller');
            try {
                const { name, email, mobile, bio, gender, expertise, bookingfees, currentWorkingHospital, experienceYears, medicalLicenseNo, photo, education } = req.body;
                const doctorData = { name, email, photo, mobile, gender, bio, expertise, bookingfees, currentWorkingHospital, experienceYears, medicalLicenseNo, education };
                const data = yield this._doctorService.editDoctor(doctorData);
                return res.status(200).json({ message: " Doctor Profile Updated", data });
            }
            catch (error) {
                console.error('Error in editprofile:', error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
    }
    uploadDocuments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered uploadDocuments controller');
            try {
                const { documents, email } = req.body;
                console.log('email', email);
                console.log('documents', documents);
                const doctorData = { documents, email };
                const data = yield this._doctorService.uploadDocuments(doctorData);
                if (data) {
                    return res.status(200).json({ message: "upload documents successfull", data });
                }
                else {
                    return res.status(400).json({ message: "documents failed to upload" });
                }
            }
            catch (error) {
                console.log('error in uploadDocuments', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    fetchDocuments(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchDocument controller');
            try {
                const email = req.query.email;
                console.log('email', email);
                const data = yield this._doctorService.fetchDocuments(email);
                if (data) {
                    return res.status(200).json({ message: 'fetched documents successfull', data });
                }
                else {
                    return res.status(400).json({ message: 'fetching documents Unsuccessfull', data });
                }
            }
            catch (error) {
                console.log('error in fetchingDocuments', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    updateSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered update slots controller');
            try {
                const slotsArray = req.body;
                console.log('body data', req.body);
                const updatedSlots = yield Promise.all(slotsArray.map((slotData) => __awaiter(this, void 0, void 0, function* () {
                    const { doctorId, day, startTime, endTime, duration, breakTime } = slotData;
                    console.log('slot data in controller', slotData);
                    const slotsData = {
                        doctorId,
                        startDate: day,
                        endDate: day,
                        startTime,
                        endTime,
                        duration,
                        breakTime
                    };
                    return yield this._doctorService.updateSlots(slotsData);
                })));
                return res.status(201).json({ message: 'slots update successful', data: updatedSlots });
            }
            catch (error) {
                console.log('error in updateslots', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    fetchSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchSlots controller');
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
    deleteSlots(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered delete slots controller');
            try {
                const { slotId, selectedShifts } = req.body;
                const updatedSlots = yield this._doctorService.deleteSlots(slotId, selectedShifts);
                if (updatedSlots) {
                    return res.status(200).json({ message: 'slot deleted successfully', slot: updatedSlots });
                }
                else {
                    return res.status(400).json({ message: 'slot deletion unsuccessfull' });
                }
            }
            catch (error) {
                console.log('error in delete slots', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = doctorController;
