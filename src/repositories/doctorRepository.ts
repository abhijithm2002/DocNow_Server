import Doctors, { Doctor } from "../models/doctorModel";
import { IdoctorRepository } from "./interfaces/IdoctorRepository";
import Slots, { ISlot } from "../models/slotModel";

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

    async editSingleDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        console.log('entered repository of editsingledoctor', doctorData.email)
        try {
            return await Doctors.findOne({email: doctorData.email}).exec()
        } catch (error) {
            throw error
        }
    }

    async insertSlots(slotsData: ISlot[]): Promise<ISlot[] | null> {
        try {
            console.log('Inserting Slots Data:', slotsData);
            const result = await Slots.insertMany(slotsData);
            console.log('Inserted Slots:', result);
            return result;
        } catch (error) {
            console.error('Error in insertSlots:', error);
            throw error;
        }
    }


    async fetchSlots(id: string, date: string): Promise<ISlot[] | null> {
        console.log('entered fetch slots repo');
        try {
            const startDate = new Date(date);
            const endDate = new Date(date);
            endDate.setDate(endDate.getDate() + 1); // Move to the next day
    
            const slots = await Slots.find({
                doctorId: id,
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }).exec();
    
            console.log('slotsssss', slots);
            return slots;
        } catch (error) {
            console.error('Error fetching slots:', error);
            throw new Error('Error fetching slots');
        }
    }
    

    async fetchDocuments(email: string): Promise<Doctor | null> {
        try {
            const doctor = await Doctors.findOne({email}).select('documents documents_verified')
            console.log(doctor)
            return doctor 
            
        } catch (error) {
            return null
        }
    }
    
    
    
}

