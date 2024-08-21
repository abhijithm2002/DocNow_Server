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
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const slotModel_1 = __importDefault(require("../models/slotModel"));
class doctorRepository {
    signupDoctor(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield doctorModel_1.default.findOne({ email: userData.email });
                if (user) {
                    return null;
                }
                console.log('about to create doctor');
                console.log(userData);
                return yield doctorModel_1.default.create(userData);
            }
            catch (err) {
                throw err;
            }
        });
    }
    doctorFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.find().select('-password');
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchDoctor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield doctorModel_1.default.findOne({ _id: id }).select('-password');
            }
            catch (error) {
                throw error;
            }
        });
    }
    editSingleDoctor(doctorData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered repository of editsingledoctor', doctorData.email);
            try {
                return yield doctorModel_1.default.findOne({ email: doctorData.email }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    insertSlots(slotsData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Inserting or Updating Slots Data:', slotsData);
                const promises = slotsData.map(slot => {
                    return slotModel_1.default.findOneAndUpdate({ doctorId: slot.doctorId, date: slot.date }, { shifts: slot.shifts, createdAt: slot.createdAt }, { upsert: true, new: true } // upsert: true to insert if not found, new: true to return the updated document
                    );
                });
                const result = yield Promise.all(promises);
                console.log('Inserted or Updated Slots:', result);
                return result;
            }
            catch (error) {
                console.error('Error in insertSlots:', error);
                throw error;
            }
        });
    }
    fetchSlots(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetch slots repo');
            try {
                const startDate = new Date(date);
                const endDate = new Date(date);
                endDate.setDate(endDate.getDate() + 1);
                const slots = yield slotModel_1.default.find({
                    doctorId: id,
                    date: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }).exec();
                console.log('slotsssss', slots);
                return slots;
            }
            catch (error) {
                console.error('Error fetching slots:', error);
                throw new Error('Error fetching slots');
            }
        });
    }
    deleteSlots(slotId, selectedShifts) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered delete slots repo');
            try {
                const slot = yield slotModel_1.default.findById(slotId);
                if (!slot) {
                    console.log('Slot not found');
                    return null;
                }
                slot.shifts = slot.shifts.filter(shift => !selectedShifts.includes(shift));
                const updatedSlot = yield slot.save();
                console.log('Updated slot after deletion:', updatedSlot);
                return updatedSlot;
            }
            catch (error) {
                console.error('Error in deleteSlots:', error);
                throw error;
            }
        });
    }
    fetchDocuments(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield doctorModel_1.default.findOne({ email }).select('documents documents_verified');
                console.log(doctor);
                return doctor;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.default = doctorRepository;
