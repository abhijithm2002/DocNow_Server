import { Patient } from "../../../models/userModel";
import { Doctor } from "../../../models/doctorModel";
import { IBooking } from "../../../models/bookingModel";
import { IBanner } from "../../../models/bannerModel";
import mongoose from "mongoose";

export interface IpatientService {
    signupPatient(userData: Partial<Patient>): Promise < Patient | null>
    editPatient(userData : Partial<Patient>) : Promise <Patient | null >
    fetchDoctorDetails(id: string): Promise<Doctor | null >
    postBooking(userData: Partial<IBooking>): Promise<IBooking | null >
    fetchBookings(id: string, date: string): Promise<IBooking[] | null>
    myBookings(patientId: string): Promise<IBooking[] | null>
    cancelBooking(bookingId: string): Promise<IBooking | null>
    getWalletHistory(patientId: string): Promise<Patient | null>
    getBanner(): Promise<IBanner[] | null>
    addFavouriteDoctor(patientId: string, doctorId: string): Promise<string>
    getFavouriteDoctors(patientId: string): Promise<mongoose.Types.ObjectId[] | null>;
    fetchDoctorList():Promise<Doctor[] | null> 
}