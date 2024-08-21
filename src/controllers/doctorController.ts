import { IdoctorController } from "./interfaces/IdoctorController";
import { Request, Response, NextFunction } from "express";
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
            const { name, email, mobile, address, gender, password, photo, is_verified, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown,education } = req.body;
            console.log('details body: ', req.body);
            const hashedPassword = await bcrypt.hash(password, 10);
            const data = { name, email, address, mobile, gender, password: hashedPassword, photo, expertise, workingDays, currentWorkingHospital, dateOfBirth, languageKnown, education };
            const userData = await this._doctorService.signupDoctor(data);
            return res.status(201).json({
                message: "User data collected, proceed with OTP verification",
                email,
                data
            });

        } catch (error) {
            throw error
        }
    }

    async editDoctor(req: Request, res: Response, next: NextFunction) {
        console.log('entering edit doctor controller');

        try {
            const {
                name,
                email,
                mobile,
                bio,
                gender,
                expertise,
                bookingfees,
                currentWorkingHospital,
                experienceYears,
                medicalLicenseNo,
                photo,
                education
            } = req.body
            const doctorData = {name, email, photo, mobile,gender,bio,expertise,bookingfees,currentWorkingHospital,experienceYears,medicalLicenseNo,education}
            const  data = await this._doctorService.editDoctor(doctorData)
            return res.status(200).json({message: " Doctor Profile Updated", data})
        } catch (error) {
            console.error('Error in editprofile:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async uploadDocuments(req: Request, res: Response, next: NextFunction) {
        console.log('entered uploadDocuments controller')
        try {
            const {documents, email} = req.body;
            console.log('email',email)
            console.log('documents',documents)
            const doctorData = {documents, email};
            const data = await this._doctorService.uploadDocuments(doctorData)
            if(data) {
                return res.status(200).json({message: "upload documents successfull", data})
                
            } else {
                return res.status(400).json({message: "documents failed to upload"})
            }
        } catch (error) {
            console.log('error in uploadDocuments',error)
            res.status(500).json({message: 'Internal server error'})
        }
    }

    async fetchDocuments(req: Request, res: Response, next: NextFunction) {
        console.log('entered fetchDocument controller')
        try {
            const email = req.query.email as string;
            console.log('email', email)
            const data = await this._doctorService.fetchDocuments(email)
            if(data) {
                return res.status(200).json({message: 'fetched documents successfull', data})
            } else {
                return res.status(400).json({message: 'fetching documents Unsuccessfull', data})

            }
        } catch (error) {
            console.log('error in fetchingDocuments',error)
            res.status(500).json({message: 'Internal server error'})
        }
    }


    async updateSlots(req: Request, res: Response, next: NextFunction) {
        console.log('entered update slots controller');
        try {
            const slotsArray = req.body; 
            console.log('body data', req.body);
    
            const updatedSlots = await Promise.all(slotsArray.map(async (slotData: any) => {
                const { doctorId, day, startTime, endTime, duration, breakTime } = slotData;
                console.log('slot data in controller', slotData);
                
                const slotsData = {
                    doctorId,
                    startDate: day, 
                    endDate: day,   
                    startTime,
                    endTime,
                    duration,
                    breakTime
                };
                
                return await this._doctorService.updateSlots(slotsData);
            }));
    
            return res.status(201).json({ message: 'slots update successful', data: updatedSlots });
        } catch (error) {
            console.log('error in updateslots', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async fetchSlots(req: Request, res: Response, next: NextFunction) {
        console.log('entered fetchSlots controller')
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


    async deleteSlots(req: Request, res: Response, next: NextFunction) {
        console.log('entered delete slots controller')
        try {
            const {slotId, selectedShifts} = req.body;
            const updatedSlots = await this._doctorService.deleteSlots(slotId,selectedShifts)
            if(updatedSlots) {
                return res.status(200).json({message: 'slot deleted successfully',slot: updatedSlots})
            } else {
                return res.status(400).json({message: 'slot deletion unsuccessfull'})
            }
        } catch (error) {
            console.log('error in delete slots', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
}


