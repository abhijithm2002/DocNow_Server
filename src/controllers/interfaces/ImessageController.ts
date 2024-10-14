import { Request, Response, NextFunction } from "express";
export interface ImessageController{
    sendMessage(req:Request, res: Response, next: NextFunction): void;
}