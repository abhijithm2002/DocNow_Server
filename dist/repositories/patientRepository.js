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
const userModel_1 = __importDefault(require("../models/userModel"));
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
}
exports.default = PatientRepository;
