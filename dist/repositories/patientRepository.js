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
const bookingModel_1 = __importDefault(require("../models/bookingModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const doctorModel_1 = __importDefault(require("../models/doctorModel"));
const bannerModel_1 = __importDefault(require("../models/bannerModel"));
class PatientRepository {
    signupPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userData.photo) {
                    const data = yield userModel_1.default.findOne({ email: userData.email });
                    if (data) {
                        return data;
                    }
                    else {
                        return yield userModel_1.default.create(userData);
                    }
                }
                const data = yield userModel_1.default.findOne({ email: userData.email });
                if (data) {
                    return null;
                }
                console.log('about to create user');
                console.log(userData);
                return yield userModel_1.default.create(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    patientFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.find().select('-password');
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchPatient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield userModel_1.default.findOne({ _id: id }).select('-password');
            }
            catch (error) {
                throw error;
            }
        });
    }
    editSinglePatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Entered editSinglePatient repo ', userData.email);
            try {
                const response = yield userModel_1.default.findOne({ email: userData.email }).exec();
                console.log('response', response);
                return response;
            }
            catch (error) {
                throw error;
            }
        });
    }
    postBooking(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered postBooking respository');
            try {
                console.log('doctorId:', userData.doctorId);
                const isAvailable = yield bookingModel_1.default.find();
                const doctor = yield doctorModel_1.default.findById(userData.doctorId);
                console.log("Doctor found:", doctor);
                if (!doctor)
                    throw new Error(`Doctor not found with ID: ${userData.doctorId}`);
                const patient = yield userModel_1.default.findById(userData.patientId);
                if (!patient)
                    throw new Error("Patient not found.");
                if (userData.fee === undefined)
                    throw new Error("Booking fee not defined.");
                doctor.Wallet = doctor.Wallet || 0;
                patient.Wallet = patient.Wallet || 0;
                doctor.WalletHistory = doctor.WalletHistory || [];
                patient.WalletHistory = patient.WalletHistory || [];
                doctor.Wallet += userData.fee;
                doctor.WalletHistory.push({
                    date: new Date(),
                    amount: userData.fee,
                    message: `Booking fee received from ${patient.name}`,
                });
                const fee = userData.fee;
                if (patient.Wallet >= fee) {
                    patient.Wallet -= fee;
                    patient.WalletHistory.push({
                        date: new Date(),
                        amount: -fee,
                        message: "Booking fee deducted",
                    });
                }
                else {
                    patient.WalletHistory.push({
                        date: new Date(),
                        amount: -patient.Wallet,
                        message: "Booking fee deducted",
                    });
                    patient.Wallet = 0;
                }
                yield doctor.save();
                yield patient.save();
                return yield bookingModel_1.default.create(userData);
            }
            catch (err) {
                console.error("Error in postbookings:", err);
                throw err;
            }
        });
    }
    fetchBookings(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchBooking repo');
            try {
                return yield bookingModel_1.default.find({ doctorId: id, date: date }).exec();
            }
            catch (error) {
                throw error;
            }
        });
    }
    myBookings(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered my bookings repo');
            try {
                return bookingModel_1.default.find({ patientId: patientId })
                    .populate({ path: 'doctorId', populate: {
                        path: 'expertise'
                    },
                })
                    .sort({ updatedAt: -1 });
            }
            catch (error) {
                throw error;
            }
        });
    }
    cancelBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log('entered cancel booking repo');
            try {
                const booking = yield bookingModel_1.default.findOne({ _id: bookingId });
                if (!booking) {
                    throw new Error('booking not found');
                }
                const fee = booking.fee;
                const doctor = yield doctorModel_1.default.findById(booking.doctorId);
                const patient = yield userModel_1.default.findById(booking.patientId);
                if (doctor && fee !== undefined) {
                    doctor.Wallet = doctor.Wallet || 0;
                    doctor.Wallet -= fee;
                    (_a = doctor.WalletHistory) === null || _a === void 0 ? void 0 : _a.push({
                        date: new Date(),
                        amount: fee,
                        message: `Booking cancelled of patient ${patient.name}`
                    });
                    yield doctor.save();
                }
                if (patient && fee !== undefined) {
                    patient.Wallet = patient.Wallet || 0;
                    patient.Wallet += fee;
                    patient.WalletHistory.push({
                        date: new Date(),
                        amount: fee,
                        message: `Refund for booking cancelled from ${doctor.name}`
                    });
                    yield patient.save();
                }
                booking.status = 'Canceled';
                yield booking.save();
                console.log(booking);
                return booking;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWalletHistory(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('enterd repo wallet ');
            try {
                const walletData = yield userModel_1.default.findById(patientId).select('Wallet WalletHistory').sort({ "WalletHistory.date": -1 });
                return walletData;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bannerData = yield bannerModel_1.default.find({ status: true }).sort({ createdAt: -1 });
                return bannerData;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = PatientRepository;
