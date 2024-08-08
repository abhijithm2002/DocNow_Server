import { IdoctorController } from "./interfaces/IdoctorController";
import { Request,Response,NextFunction } from "express";
import VerificationService from "../services/patient/verificationService";
import bcrypt from 'bcrypt'
import generateJwt from "../middleware/jwt";
import { Payload } from "../middleware/jwt";
import doctorService from "../services/doctor/doctorService";

export default class doctorController implements IdoctorController {
    private _verificationService: VerificationService
    private _doctorService: doctorService
    constructor() {
        this._doctorService = new doctorService();
        this._verificationService = new VerificationService
    }

    async signupDoctor(req: Request, res: Response, next: NextFunction) {
        console.log('came to signupdoctor controller');
        
        try {
            const { name, email, mobile, address, gender, password, photo, is_verified,expertise,workingDays,currentWorkingHospital,dateOfBirth,languageKnown } = req.body;
            console.log('details body: ', req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
                const data = { name, email, address, mobile, gender, password: hashedPassword, photo,expertise,workingDays,currentWorkingHospital,dateOfBirth,languageKnown };
                const userData = await this._doctorService.signupDoctor(data);
                return res.status(201).json({
                    message: "User data collected, proceed with OTP verification",
                    email,
                    data
                });
            
        } catch (error) {
            
        }
    }
}