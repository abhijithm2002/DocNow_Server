import Booking, { IBooking } from "../models/bookingModel";
import Patients, { Patient } from "../models/userModel";
import Doctors, { Doctor } from "../models/doctorModel";
import mongoose from "mongoose";
import { IpatientRepository } from "./interfaces/IpatientRepository";
import Banner, { IBanner } from "../models/bannerModel";
import {io} from '../index'
import { getReceiverSocketId } from "../Socket/socket";



export default class PatientRepository implements IpatientRepository {
    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            if(userData.photo) {
                const data = await Patients.findOne({email: userData.email})
                if(data) {
                    return data;
                } else {
                    return await Patients.create(userData)
                }
            }

            const data = await Patients.findOne({email: userData.email})
            if(data) {
                return null;
            }
            console.log('about to create user')
            console.log(userData)
            return await Patients.create(userData);
        } catch (error) {
            throw error;
        }
    }

    async patientFetch(): Promise<Patient[] | null> {
        try {
            return await Patients.find().select('-password')
        } catch (error) {
            throw error
        }
    }

    async fetchPatient(id: string): Promise<Patient | null> {
        try {
            return await Patients.findOne({_id: id}).select('-password')
        } catch (error) {
            throw error
        }
    }

    async editSinglePatient(userData: Partial<Patient>): Promise<Patient | null> {
        console.log('Entered editSinglePatient repo ',userData.email);
        try {
            const response = await Patients.findOne({email: userData.email}).exec()
            console.log('response', response)
            return response
        } catch (error) {
            throw error
        }
    }


    async postBooking(userData: Partial<IBooking>): Promise<IBooking | null> {
        console.log('entered postBooking respository');
        
        try {
            console.log('doctorId:', userData.doctorId);
            const isAvailable = await Booking.find()
            const doctor = await Doctors.findById(userData.doctorId);
            console.log("Doctor found:", doctor);
        
            if (!doctor) throw new Error(`Doctor not found with ID: ${userData.doctorId}`);
            
            const patient = await Patients.findById(userData.patientId);
            if (!patient) throw new Error("Patient not found.");
            if (userData.fee === undefined) throw new Error("Booking fee not defined.");
        
            doctor.Wallet = doctor.Wallet || 0;
            patient.Wallet = patient.Wallet || 0;
        
            doctor.WalletHistory = doctor.WalletHistory || [];
            patient.WalletHistory = patient.WalletHistory || [];
        
            doctor.Wallet += userData.fee;
            doctor.WalletHistory.push({
                date: new Date(),
                amount: userData.fee,
                message: `Booking fee received from ${patient.name}`,
            });
        
            const fee = userData.fee;
            if (patient.Wallet >= fee) {
                patient.Wallet -= fee;
                patient.WalletHistory.push({
                    date: new Date(),
                    amount: -fee,
                    message: "Booking fee deducted",
                });
            } else {
                patient.WalletHistory.push({
                    date: new Date(),
                    amount: -patient.Wallet,
                    message: "Booking fee deducted",
                });
                patient.Wallet = 0;
            }
        
            await doctor.save();
            await patient.save();
        
            // return await Booking.create(userData);
            const booking = await Booking.create(userData);
            const receiverSocketId = getReceiverSocketId(doctor._id as string);
            console.log('////////////////////////////////////////')
            console.log('reciever socket id', receiverSocketId)
        if (booking) {
            const notificationMessage = `New booking from ${patient.name} on ${userData.date}.`;
            io.to(receiverSocketId as string).emit("newBooking", {
                message: notificationMessage,
                bookingDetails: booking,
            });
            console.log("Notification emitted to doctor:", doctor._id);
        }
    
        return booking;
        } catch (err) {
            console.error("Error in postbookings:", err);
            throw err;
        }
        
    }
    

    async fetchBookings(id: string, date: string): Promise<IBooking[] | null> {
        console.log('entered fetchBooking repo')
        try {
            return await Booking.find({ doctorId: id, date: date }).exec();
        } catch (error) {
            throw error
        }
    }

    async myBookings(patientId: string): Promise<IBooking[] | null> {
        console.log('entered my bookings repo')
        try {
            return Booking.find({patientId: patientId})
            .populate({path: 'doctorId', populate: {
                path: 'expertise'}
                ,})
                .sort({updatedAt: -1})

        } catch (error) {
            throw error
        }
    }

    // async myBookings(patientId: string, page: number, limit: number): Promise<{ data: IBooking[]; totalCount: number }> {
    //     console.log('Entered my bookings repository');
    //     try {
    //         const skip = (page - 1) * limit;
    
    //         // Fetch paginated bookings
    //         const bookings = await Booking.find({ patientId: patientId })
    //             .populate({
    //                 path: 'doctorId',
    //                 populate: {
    //                     path: 'expertise',
    //                 },
    //             })
    //             .sort({ updatedAt: -1 })
    //             .skip(skip) // Skip records for pagination
    //             .limit(limit); // Limit the number of records
    
    //         // Count total records
    //         const totalCount = await Booking.countDocuments({ patientId: patientId });
    
    //         return { data: bookings, totalCount };
    //     } catch (error) {
    //         throw error;
    //     }
    // }
    

    async cancelBooking(bookingId: string): Promise<IBooking | null> {
        console.log('entered cancel booking repo');
        try {
            const booking = await Booking.findOne({_id: bookingId})
            if(!booking) {
                throw new Error('booking not found')
            }
            const fee = booking.fee;
            const doctor = await Doctors.findById(booking.doctorId)
            const patient = await Patients.findById(booking.patientId)

            if(doctor && fee !== undefined) {
                doctor.Wallet = doctor.Wallet || 0;
                doctor.Wallet -= fee;
                doctor.WalletHistory?.push({
                    date: new Date(),
                    amount: fee,
                    message: `Booking cancelled of patient ${patient!.name}`
                })
                await doctor.save();
            } 

            if(patient && fee !== undefined) {
                patient.Wallet = patient.Wallet || 0;
                patient.Wallet += fee;
                patient.WalletHistory.push({
                    date: new Date(),
                    amount: fee,
                    message: `Refund for booking cancelled from ${doctor!.name}`
                })
                await patient.save();
            }

            booking.status = 'Canceled'
            await booking.save()
            console.log(booking)
            return booking

        } catch (error) {
            throw error
        }
        
    }

    async getWalletHistory(patientId: string): Promise<Patient | null> {
        console.log('enterd repo wallet ');
        try {
            const walletData = await Patients.findById(patientId).select('Wallet WalletHistory').sort({"WalletHistory.date": -1})
            return walletData
        } catch (error) {
            throw error
        }
        
    }

    async getBanner(): Promise<IBanner[] | null> {
        try {
            const bannerData = await Banner.find({status: true}).sort({createdAt: -1})
            return bannerData
        } catch (error) {
            throw error
        }
    }

    async addFavouriteDoctor(patientId: string, doctorId: string): Promise<string> {
        try {
            const patient = await Patients.findById(patientId);
            if(!patient) {
                throw new Error('patient not found')
            }
            patient.favourite_doctors = patient.favourite_doctors || [];
            const doctorObjectId = new mongoose.Types.ObjectId(doctorId)
            const isFavourite = patient.favourite_doctors?.some((doctor) => doctor.equals(doctorObjectId));
            if(isFavourite) {
                patient.favourite_doctors = patient.favourite_doctors.filter((favDoctorId) => !favDoctorId.equals(doctorObjectId))
                await patient.save()
                return 'doctor removed from favourites'
            } else {
                patient.favourite_doctors.push(doctorObjectId);
                await patient.save();
                return 'doctor added to favourites'
            }
        } catch (error) {
            throw error
        }
    }

    async getFavouriteDoctors(patientId: string): Promise<mongoose.Types.ObjectId[] | null> {
        try {
            const patient = await Patients.findById(patientId).populate('favourite_doctors');
            if (!patient) {
                throw new Error('patient not found')
            }
    
            return patient.favourite_doctors || null;
        } catch (error) {
            console.error('Error in getFavouriteDoctors repository:', error); 
            throw error;
        }
    }

    async fetchAdmin(): Promise<Patient | null> {
        try {
           return await Patients.findOne({is_admin: true})
        } catch (error) {
            throw error
        }
    }
    
}