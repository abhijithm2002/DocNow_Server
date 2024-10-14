import { ImessageController } from "./interfaces/ImessageController";
import { Request, Response, NextFunction } from "express";
import messageService from "../services/message/messageService";

export default class messageController implements ImessageController {
    private _messageService: messageService;
    constructor() {
        this._messageService = new messageService();

    }

    async sendMessage(req: Request, res: Response, next: NextFunction) {
        console.log('entered sendmessage')
        try {
            const message = req.body;
            const {id, senderId} = req.params;
            

        } catch (error) {
            
        }
    }
}