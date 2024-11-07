import { Patient } from "../../models/userModel";
import { IpatientService } from "./interfaces/IpatientService";
import PatientRepository from "../../repositories/patientRepository";
import { Doctor } from "../../models/doctorModel";
import doctorRepository from "../../repositories/doctorRepository";
import { IBooking } from "../../models/bookingModel";
import { IBanner } from "../../models/bannerModel";
import mongoose from "mongoose";



export default class patientService implements IpatientService {
    private _patientRepository: PatientRepository
    private _doctorRespository: doctorRepository
    constructor() {
        this._patientRepository = new PatientRepository()
        this._doctorRespository = new doctorRepository()
    }

    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            return await this._patientRepository.signupPatient(userData)
        } catch (error) {
            throw error
        }
    }

    async editPatient(userData: Partial<Patient>): Promise<Patient | null> {
        console.log('coming to edit patient service');
        
        try {
            const data = await this._patientRepository.editSinglePatient(userData)
            console.log("updated", data)
            if(data) {
                data.name = userData.name ?? data.name
                data.email = userData.email ?? data.email
                data.mobile = userData.mobile ?? data.mobile
                data.photo = userData.photo ?? data.photo
                data.gender = userData.gender ?? data.gender
                console.log('updated',data);
                
                await data.save();
                return data;
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }

    async fetchDoctorDetails(id: string): Promise<Doctor | null> {
        console.log('entered fetchDoctor details')
        try {
            return await this._doctorRespository.fetchDoctor(id)
        } catch (error) {
            throw error
        }
    }

    async postBooking(userData: Partial<IBooking>): Promise<IBooking | null> {
        console.log("entered postbooking service")
        try {
            return await this._patientRepository.postBooking(userData)
            
        } catch (error) {
            throw error
        }
    }

    async fetchBookings(id: string, date: string): Promise<IBooking[] | null> {
        console.log('entered fetch slots service')
        try {
            return await this._patientRepository.fetchBookings(id, date);
        } catch (error) {
            throw error
        }
    }

    async myBookings(patientId: string): Promise<IBooking[] | null> {
        console.log('entered my booking service')
        try {
            return await this._patientRepository.myBookings(patientId)
        } catch (error) {
            throw error
        }
    }

    async cancelBooking(bookingId: string): Promise<IBooking | null> {
        try {
            return await this._patientRepository.cancelBooking(bookingId)
        } catch (error) {
            throw error
        }
    }

    async getWalletHistory(patientId: string): Promise<Patient | null> {
        try {
            return await this._patientRepository.getWalletHistory(patientId)
        } catch (error) {
            throw error
        }
    }

    async getBanner(): Promise<IBanner[] | null> {
        try {
            return await this._patientRepository.getBanner();

        } catch (error) {
            throw error
        }
    }

    async addFavouriteDoctor(patientId: string, doctorId: string): Promise<string> {
        try {
          const message = await this._patientRepository.addFavouriteDoctor(patientId, doctorId);
          return message;
        } catch (error) {
          throw error;
        }
      }

    async getFavouriteDoctors(patientId: string): Promise<mongoose.Types.ObjectId[] | null> {
        try {
            return await this._patientRepository.getFavouriteDoctors(patientId);
        } catch (error) {
            throw error
        }
    }

    async fetchDoctorList(): Promise<Doctor[] | null> {
        try {
            return await this._doctorRespository.doctorFetch()
        } catch (error) {
            throw error
        }
    }
      
}