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
const patientRepository_1 = __importDefault(require("../../repositories/patientRepository"));
const doctorRepository_1 = __importDefault(require("../../repositories/doctorRepository"));
class patientService {
    constructor() {
        this._patientRepository = new patientRepository_1.default();
        this._doctorRespository = new doctorRepository_1.default();
    }
    signupPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.signupPatient(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    editPatient(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            console.log('coming to edit patient service');
            try {
                const data = yield this._patientRepository.editSinglePatient(userData);
                console.log("updated", data);
                if (data) {
                    data.name = (_a = userData.name) !== null && _a !== void 0 ? _a : data.name;
                    data.email = (_b = userData.email) !== null && _b !== void 0 ? _b : data.email;
                    data.mobile = (_c = userData.mobile) !== null && _c !== void 0 ? _c : data.mobile;
                    data.photo = (_d = userData.photo) !== null && _d !== void 0 ? _d : data.photo;
                    data.gender = (_e = userData.gender) !== null && _e !== void 0 ? _e : data.gender;
                    console.log('updated', data);
                    yield data.save();
                    return data;
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
    fetchDoctorDetails(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetchDoctor details');
            try {
                return yield this._doctorRespository.fetchDoctor(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    postBooking(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("entered postbooking service");
            try {
                return yield this._patientRepository.postBooking(userData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    fetchBookings(id, date) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered fetch slots service');
            try {
                return yield this._patientRepository.fetchBookings(id, date);
            }
            catch (error) {
                throw error;
            }
        });
    }
    myBookings(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered my booking service');
            try {
                return yield this._patientRepository.myBookings(patientId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    cancelBooking(bookingId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.cancelBooking(bookingId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getWalletHistory(patientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.getWalletHistory(patientId);
            }
            catch (error) {
                throw error;
            }
        });
    }
    getBanner() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this._patientRepository.getBanner();
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = patientService;
