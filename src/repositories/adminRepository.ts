import Banner,{ IBanner } from "../models/bannerModel";
import Booking, { IBooking } from "../models/bookingModel";
import Doctors, { Doctor } from "../models/doctorModel";
import { IadminRepository } from "./interfaces/IadminRepository";


export default class adminRepository implements IadminRepository {
    async createBanner(bannerData: Partial<IBanner>): Promise<IBanner | null> {
        try {
            return await Banner.create(bannerData)
        } catch (error) {
            throw error
        }
    }

    async fetchBanner(id: string): Promise<IBanner | null> {
        try {
            return await Banner.findOne({_id: id})
        } catch (error) {
            throw error
        }
    }

    async fetchBanners(): Promise<IBanner[] | null> {
        try {
            return await Banner.find().select('-password').sort({createdAt: -1})
        } catch (error) {
            throw error
        }
    }

    async bookings(): Promise<IBooking[] | null> {
        try {
            return await Booking.find().populate({path: 'doctorId'}).populate({path: "patientId"})
        } catch (error) {
            throw error
        }
    }

    async fetchDoctors(): Promise<Doctor[] | null> {
        try {
            return await Doctors.find({documents_verified: true}).select('-password')
        } catch (error) {
            throw error
        }
    }
    
}