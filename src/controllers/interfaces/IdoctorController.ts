import { NextFunction, Request, Response } from "express";

export interface IdoctorController {
    signupDoctor(req: Request, res: Response, next: NextFunction): void;
    editDoctor(req: Request, res: Response, next: NextFunction): void;
    uploadDocuments(req: Request, res: Response, next: NextFunction): void;
    fetchDocuments(req: Request, res: Response, next: NextFunction): void;
    updateSlots(req: Request, res: Response, next: NextFunction): void;
    fetchSlots(req: Request, res: Response, next: NextFunction): void;
    deleteSlots(req: Request, res: Response, next: NextFunction): void;
    
}