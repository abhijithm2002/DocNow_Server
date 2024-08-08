import { NextFunction, Request, Response } from "express";

export interface IdoctorController {
    signupDoctor(req: Request, res: Response, next: NextFunction): void;
}