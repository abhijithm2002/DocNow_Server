import { NextFunction, Request, Response } from "express";

export interface IpatientController{
    signupPatient(req: Request, res: Response, next: NextFunction): void
    editPatient(req: Request, res: Response, next: NextFunction): void
    fetchDoctorDetails(req: Request, res: Response, next: NextFunction): void
    fetchSlots(req: Request, res: Response, next: NextFunction): void;
    
}