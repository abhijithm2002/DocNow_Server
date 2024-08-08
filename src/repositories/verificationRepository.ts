
import { IverificationRepository } from "./interfaces/IverificationRepository";
import Otp from '../models/otpModel';
import AppError from "../utils/AppError";
import Patients, { Patient } from "../models/userModel";
import Doctors, { Doctor } from "../models/doctorModel";

export default class verificationRepository implements IverificationRepository {
    async storeOtp(email: string, otp: string): Promise<void> {
        try {
            await Otp.create({ email, otp });
        } catch (error) {
            throw error;
        }
    }

    async verifyOtp(email: string, enteredOtp: string): Promise<boolean> {
        console.log('entered verify otp repository')
        try {
            const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 }).exec();
            console.log('otpRecord: ',otpRecord)
            console.log('entered otp : ', enteredOtp)
            if (otpRecord && otpRecord.otp === enteredOtp) {
                await otpRecord.deleteOne();
                return true
            } else {
                console.log('app error vannu')
                throw new AppError('Enter the correct OTP', 400);
               
            }
        } catch (error) {
            throw error;
        }
    }

    

    async patientLogin(email: string): Promise<Patient | null> {
        console.log('entered patient login repository', email)
        try {
            console.log('/////////////////////////')
            console.log(email)
            console.log('typeeee:', typeof email)
            return await Patients.findOne({email}).exec()
        } catch (error) {
            console.log('patietlogin repo ////////// error')
            throw error
        }
    }

    async existingDoctor(email: string): Promise<Doctor | null> {
        console.log('entered checking existing  doctor repository')
        try {
            return await Doctors.findOne({email}).exec()
        } catch (error) {
            throw error
        }
    }

    async adminLogin(email: string): Promise<Patient | null> {
        console.log('entered admin login repository');
        try {
            const adminData = await Patients.findOne({email, is_admin: true}).exec()
            return adminData;
        } catch (error) {
            throw error
        }
        
    }
}
