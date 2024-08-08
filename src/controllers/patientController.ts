import { Request, Response, NextFunction } from 'express';
import patientService from '../services/patient/patientService';
import bcrypt from 'bcrypt';
import { IpatientController } from './interfaces/IpatientController';

export default class patientController implements IpatientController {
    private _patientService: patientService;

    constructor() {
        this._patientService = new patientService();
    }

    async signupPatient(req: Request, res: Response, next: NextFunction) {
        console.log('Entered signupPatient controller method');
        try {
            const { name, email, mobile, address, gender, password, photo, is_verified ,role} = req.body;
            console.log("Signup payload:", req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = { name, email, address, mobile, gender, password: hashedPassword, photo,role };
            const userData = await this._patientService.signupPatient(data);
            return res.status(201).json({
                message: "User data collected, proceed with OTP verification",
                email,
                data
            });

        } catch (error) {
            console.error('Error in signupPatient:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async editPatient(req: Request, res: Response, next: NextFunction) {
        console.log('coming to edit patient controller')
        try {
            const {name, email, photo, mobile,gender} = req.body;
            console.log('body data', req.body)
            const userData = {name, email, photo, mobile,gender}
            const data = await this._patientService.editPatient(userData);
            return res.status(200).json({message: "Profile Updated", name, email, photo, mobile})
        } catch (error) {
            console.error('Error in editprofile:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}


