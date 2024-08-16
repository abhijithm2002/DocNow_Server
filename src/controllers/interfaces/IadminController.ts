import { Response, Request, NextFunction } from "express";

export interface IadminController {
    fetchUserList(req: Request, res: Response, next: NextFunction):void;
    blockUnblockPatient(req: Request, res: Response, next: NextFunction):void;
    blockUnblockDoctor(req: Request, res: Response, next: NextFunction):void;
    fetchDoctorList(req: Request, res: Response, next: NextFunction):void;
    verifyDocuments(req: Request, res: Response, next: NextFunction):void;
}