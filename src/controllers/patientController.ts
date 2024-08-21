import { Request, Response, NextFunction } from 'express';
import patientService from '../services/patient/patientService';
import bcrypt from 'bcrypt';
import { IpatientController } from './interfaces/IpatientController';
import doctorService from '../services/doctor/doctorService';

export default class patientController implements IpatientController {
    private _patientService: patientService;
    private _doctorService: doctorService

    constructor() {
        this._patientService = new patientService();
        this._doctorService = new doctorService();
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

    async fetchDoctorDetails(req: Request, res: Response, next: NextFunction) {
        console.log("entered fetchDoctorDetails controller")
        try {
            const {id} = req.query
            console.log(id)
            const data = await this._patientService.fetchDoctorDetails(id as string)
            if(data) {
                return res.status(200).json({message: "doctor details fetched successfull", data})
            } else {
                return res.status(400).json({message: 'fetching doctor details  Unsuccessfull'})
            }
        } catch (error) {
            console.error('Error in fetching doctor details :', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async fetchSlots(req: Request, res: Response, next: NextFunction) {
        console.log('entered user fetchSlots controller')
        try {
            const {id,date}=req.query
            console.log('id',id)
            console.log('date...',date)
            const slots=await this._doctorService.fetchSlots(id as string,date as string)
            if(slots) {
                return res.status(200).json({message: 'slot fetched successfully', slots})
            } else {
                return res.status(400).json({message: 'slot fetched unsuccessfull'})

            }
        } catch (error) {
            throw error
        }
    }


}