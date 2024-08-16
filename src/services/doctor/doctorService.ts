import { Doctor } from "../../models/doctorModel";
import { IdoctorService } from "./interfaces/IdoctorService";
import doctorRepository from "../../repositories/doctorRepository";
import Slots, { ISlot } from "../../models/slotModel";

export default class doctorService implements IdoctorService {
    private _doctorRepository: doctorRepository;
    constructor() {
        this._doctorRepository = new doctorRepository()
    }

    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            return await this._doctorRepository.signupDoctor(userData)
        } catch (error) {
            throw error
        }
    }

    async editDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        console.log('entered the editDoctor service')
        try {
            const updatedData = await this._doctorRepository.editSingleDoctor(doctorData)
            console.log('updated data', updatedData)

            if (updatedData) {
                updatedData.name = doctorData.name ?? updatedData.name
                updatedData.email = doctorData.email ?? updatedData.email
                updatedData.mobile = doctorData.mobile ?? updatedData.mobile
                updatedData.photo = doctorData.photo ?? updatedData.photo
                updatedData.gender = doctorData.gender ?? updatedData.gender
                updatedData.bio = doctorData.bio ?? updatedData.bio
                updatedData.expertise = doctorData.expertise ?? updatedData.expertise
                updatedData.bookingfees = doctorData.bookingfees ?? updatedData.bookingfees
                updatedData.currentWorkingHospital = doctorData.currentWorkingHospital ?? updatedData.currentWorkingHospital
                updatedData.experienceYears = doctorData.experienceYears ?? updatedData.experienceYears
                updatedData.medicalLicenseNo = doctorData.medicalLicenseNo ?? updatedData.medicalLicenseNo
                updatedData.education = doctorData.education ?? updatedData.education
                await updatedData.save();
                return updatedData
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }


    async uploadDocuments(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        console.log('Entered upload Document service');
        try {
            const doctor = await this._doctorRepository.editSingleDoctor(doctorData);

            if (doctor) {
                doctor.documents = doctorData.documents || [];
                
                doctor.documents_verified = false;
                await doctor.save();
                return doctor;
            } else {
                throw new Error('Doctor not found');
            }
        } catch (error) {
            console.error('Error uploading documents:', error);
            throw error;
        }
    }

    async fetchDocuments(email: string): Promise<Doctor | null> {
        console.log('entered fetchDocuments service')
        try {
            return await this._doctorRepository.fetchDocuments(email)

        } catch (error) {
            throw error
        }
    }


    async updateSlots(slotsData: any): Promise<ISlot[] | null> {
        console.log('entered updateSlots service');
        try {
            const { doctorId, startDate, endDate, startTime, endTime, duration, breakTime } = slotsData;
            console.log('slotsData', slotsData);
    
            const start = new Date(startDate);
            const end = new Date(endDate);
            let currentDate = new Date(start);
            let allSlots: ISlot[] = [];
    
            const startTimeDate = new Date(startTime); // Parsing startTime
            const endTimeDate = new Date(endTime); // Parsing endTime
    
            while (currentDate <= end) {
                const daySlots: string[] = [];
                let shiftStart = new Date(currentDate); // clone the date
                shiftStart.setHours(startTimeDate.getHours(), startTimeDate.getMinutes(), 0, 0);
                const shiftEnd = new Date(currentDate);
                shiftEnd.setHours(endTimeDate.getHours(), endTimeDate.getMinutes(), 0, 0);
    
                while (shiftStart < shiftEnd) {
                    let shiftEndTime = new Date(shiftStart.getTime() + duration * 60000);
                    if (shiftEndTime > shiftEnd) break;
    
                    const shiftStartFormatted = shiftStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
                    const shiftEndFormatted = shiftEndTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    
                    daySlots.push(`${shiftStartFormatted} - ${shiftEndFormatted}`);
                    shiftStart = new Date(shiftEndTime.getTime() + breakTime * 60000);
                }
    
                const slot = new Slots({
                    doctorId,
                    date: new Date(currentDate), // ensure currentDate is a new Date object
                    shifts: daySlots,
                    createdAt: new Date(),
                });
    
                allSlots.push(slot);
    
                currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1)); // Move to the next day
            }
    
            console.log('Generated Slots:', allSlots);
    
            // Call repository to save slots
            const savedSlots = await this._doctorRepository.insertSlots(allSlots);
            console.log('saved slots ////', savedSlots);
            return savedSlots;
    
        } catch (error) {
            console.error('Error in updateSlots service:', error);
            throw error;
        }
    }
    
    
    async fetchSlots(id: string, date: string): Promise<ISlot[] | null> {
        console.log('entered fetch slots service')
        try {
            return await this._doctorRepository.fetchSlots(id, date);
        } catch (error) {
            throw error
        }
    }


}


