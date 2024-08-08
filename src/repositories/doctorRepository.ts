import Doctors, { Doctor } from "../models/doctorModel";
import { IdoctorRepository } from "./interfaces/IdoctorRepository";

export default class doctorRepository implements IdoctorRepository {
    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            let user=await Doctors.findOne({email:userData.email})
            if(user){
                return null
            }
            console.log('about to create doctor');
            console.log(userData)
            return await Doctors.create(userData);
        }catch(err){
            throw err
        }
    }

   async doctorFetch(): Promise<Doctor[] | null> {
        try {
            return await Doctors.find().select('-password')
        } catch (error) {
            throw error
        }
    }
    
    async fetchDoctor(id: string): Promise<Doctor | null> {
        try {
            return await Doctors.findOne({_id: id}).select('-password')
        } catch (error) {
            throw error
        }
    }
}