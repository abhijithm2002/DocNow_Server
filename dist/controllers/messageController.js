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
const messageService_1 = __importDefault(require("../services/message/messageService"));
class messageController {
    constructor() {
        this._messageService = new messageService_1.default();
    }
    sendMessage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('entered sendmessage');
            try {
                const message = req.body;
                const { id, senderId } = req.params;
            }
            catch (error) {
            }
        });
    }
}
exports.default = messageController;
