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
class patientService {
    constructor() {
        this._patientRepository = new patientRepository_1.default();
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
            var _a, _b, _c, _d;
            console.log('coming to edit patient service');
            try {
                const data = yield this._patientRepository.editSinglePatient(userData);
                console.log("updated", data);
                if (data) {
                    data.name = (_a = userData.name) !== null && _a !== void 0 ? _a : data.name;
                    data.email = (_b = userData.email) !== null && _b !== void 0 ? _b : data.email;
                    data.mobile = (_c = userData.mobile) !== null && _c !== void 0 ? _c : data.mobile;
                    data.photo = (_d = userData.photo) !== null && _d !== void 0 ? _d : data.photo;
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
}
exports.default = patientService;
