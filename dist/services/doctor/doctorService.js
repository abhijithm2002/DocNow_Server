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
const doctorRepository_1 = __importDefault(require("../../repositories/doctorRepository"));
const slotModel_1 = __importDefault(require("../../models/slotModel"));
class doctorService {
    constructor() {
        this._doctorRepository = new doctorRepository_1.default();
    }
    signupDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._doctorRepository.signupDoctor(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    editDoctor(doctorData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            console.log('entered the editDoctor service');
            try {
                const updatedData = yield this._doctorRepository.editSingleDoctor(doctorData);
                console.log('updated data', updatedData);
                if (updatedData) {
                    updatedData.name = (_a = doctorData.name) !== null && _a !== void 0 ? _a : updatedData.name;
                    updatedData.email = (_b = doctorData.email) !== null && _b !== void 0 ? _b : updatedData.email;
                    updatedData.mobile = (_c = doctorData.mobile) !== null && _c !== void 0 ? _c : updatedData.mobile;
                    updatedData.photo = (_d = doctorData.photo) !== null && _d !== void 0 ? _d : updatedData.photo;
                    updatedData.gender = (_e = doctorData.gender) !== null && _e !== void 0 ? _e : updatedData.gender;
                    updatedData.bio = (_f = doctorData.bio) !== null && _f !== void 0 ? _f : updatedData.bio;
                    updatedData.expertise = (_g = doctorData.expertise) !== null && _g !== void 0 ? _g : updatedData.expertise;
                    updatedData.bookingfees = (_h = doctorData.bookingfees) !== null && _h !== void 0 ? _h : updatedData.bookingfees;
                    updatedData.currentWorkingHospital = (_j = doctorData.currentWorkingHospital) !== null && _j !== void 0 ? _j : updatedData.currentWorkingHospital;
                    updatedData.experienceYears = (_k = doctorData.experienceYears) !== null && _k !== void 0 ? _k : updatedData.experienceYears;
                    updatedData.medicalLicenseNo = (_l = doctorData.medicalLicenseNo) !== null && _l !== void 0 ? _l : updatedData.medicalLicenseNo;
                    updatedData.education = (_m = doctorData.education) !== null && _m !== void 0 ? _m : updatedData.education;
                    yield updatedData.save();
                    return updatedData;
                }
                else {
                    return null;
                }
            }
            catch (error) {
                throw error;
            }
        });
    }
    uploadDocuments(doctorData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Entered upload Document service');
            try {
                const doctor = yield this._doctorRepository.editSingleDoctor(doctorData);
                if (doctor) {
                    doctor.documents = doctorData.documents || [];
                    doctor.documents_verified = false;
                    yield doctor.save();
                    return doctor;
                }
                else {
                    throw new Error('Doctor not found');
                }
            }
            catch (error) {
                console.error('Error uploading documents:', error);
                throw error;
            }
        });
    }
    fetchDocuments(email) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchDocuments service');
            try {
                return yield this._doctorRepository.fetchDocuments(email);
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateSlots(slotsData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered updateSlots service');
            try {
                const { doctorId, startDate, endDate, startTime, endTime, duration, breakTime } = slotsData;
                console.log('slotsData', slotsData);
                const start = new Date(startDate);
                const end = new Date(endDate);
                let currentDate = new Date(start);
                let allSlots = [];
                const startTimeDate = new Date(startTime);
                const endTimeDate = new Date(endTime);
                while (currentDate <= end) {
                    const daySlots = [];
                    let shiftStart = new Date(currentDate);
                    shiftStart.setHours(startTimeDate.getHours(), startTimeDate.getMinutes(), 0, 0);
                    const shiftEnd = new Date(currentDate);
                    shiftEnd.setHours(endTimeDate.getHours(), endTimeDate.getMinutes(), 0, 0);
                    while (shiftStart < shiftEnd) {
                        let shiftEndTime = new Date(shiftStart.getTime() + duration * 60000);
                        if (shiftEndTime > shiftEnd)
                            break;
                        const shiftStartFormatted = shiftStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                        const shiftEndFormatted = shiftEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                        daySlots.push(`${shiftStartFormatted} - ${shiftEndFormatted}`);
                        shiftStart = new Date(shiftEndTime.getTime() + breakTime * 60000);
                    }
                    // Check if slot exists for the current date
                    let slot = yield slotModel_1.default.findOne({
                        doctorId,
                        date: new Date(currentDate)
                    });
                    if (slot) {
                        // Update existing slot
                        slot.shifts = daySlots;
                        slot.createdAt = new Date(); // Optionally update createdAt
                        yield slot.save();
                    }
                    else {
                        // Create new slot
                        slot = new slotModel_1.default({
                            doctorId,
                            date: new Date(currentDate),
                            shifts: daySlots,
                            createdAt: new Date(),
                        });
                        allSlots.push(slot);
                    }
                    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
                }
                // Save new slots
                if (allSlots.length > 0) {
                    const savedSlots = yield this._doctorRepository.insertSlots(allSlots);
                    console.log('saved slots ////', savedSlots);
                    return savedSlots;
                }
                return allSlots; // Return the updated slots
            }
            catch (error) {
                console.error('Error in updateSlots service:', error);
                throw error;
            }
        });
    }
    fetchSlots(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetch slots service');
            try {
                return yield this._doctorRepository.fetchSlots(id, date);
            }
            catch (error) {
                throw error;
            }
        });
    }
    deleteSlots(slotId, selectedShifts) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered delete slots service');
            try {
                return yield this._doctorRepository.deleteSlots(slotId, selectedShifts);
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchAppointments(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('fetch appointment service');
            try {
                return yield this._doctorRepository.fetchAppointments(doctorId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWalletHistory(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('fetch wallt history service');
            try {
                return yield this._doctorRepository.getWalletHistory(doctorId);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = doctorService;
