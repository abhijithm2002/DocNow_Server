import Doctors, { Doctor } from "../models/doctorModel";
import { IdoctorRepository } from "./interfaces/IdoctorRepository";
import Slots, { ISlot } from "../models/slotModel";
import Booking, { IBooking } from "../models/bookingModel";
import   Notification, { INotifications } from "../models/notificationModel";
import Patients, { Patient } from "../models/userModel";

export default class doctorRepository implements IdoctorRepository {
    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            let user = await Doctors.findOne({ email: userData.email })
            if (user) {
                return null
            }
            console.log('about to create doctor');
            console.log(userData)
            return await Doctors.create(userData);
        } catch (err) {
            throw err
        }
    }

    
    async doctorFetch({
        page,
        limit,
        search,
        specialization,
        
    }: {
        page: number;
        limit: number;
        search: string;
        specialization: string;
        
    }): Promise<{ doctors: Doctor[]; total: number }> {
        try {
            const skip = (page - 1) * limit;
    
            const query: any = {
                documents_verified: true,
                is_blocked: false,
            };
    
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                    { expertise: { $regex: search, $options: 'i' } },
                ];
            }
    
            if (specialization) {
                query.expertise = specialization;
            }
    
            
    
            const [doctors, total] = await Promise.all([
                Doctors.find(query).select('-password').skip(skip).limit(limit),
                Doctors.countDocuments(query),
            ]);
    
            return { doctors, total };
        } catch (error) {
            throw error;
        }
    }
    
    

    async fetchDoctor(id: string): Promise<Doctor | null> {
        try {
            return await Doctors.findOne({ _id: id }).select('-password')
        } catch (error) {
            throw error
        }
    }

    async editSingleDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            const updatedDoctor = await Doctors.findOneAndUpdate(
                { email: doctorData.email },
                { $set: doctorData }, 
                { new: true }
            ).exec();
    
            return updatedDoctor;
        } catch (error) {
            console.error('Error in editSingleDoctor:', error);
            throw error;
        }
    }
    
    

    async insertSlots(slotsData: ISlot[]): Promise<ISlot[] | null> {
        try {
            console.log('Inserting or Updating Slots Data:', slotsData);

            const promises = slotsData.map(slot => {
                return Slots.findOneAndUpdate(
                    { doctorId: slot.doctorId, date: slot.date },
                    { shifts: slot.shifts, createdAt: slot.createdAt },
                    { upsert: true, new: true }
                );
            });

            const result = await Promise.all(promises);
            console.log('Inserted or Updated Slots:', result);
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
            endDate.setDate(endDate.getDate() + 1);

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


    async deleteSlots(slotId: string, selectedShifts: string[]): Promise<ISlot | null> {
        console.log('entered delete slots repo')
        try {
            const slot = await Slots.findById(slotId);

            if (!slot) {
                console.log('Slot not found');
                return null;
            }
            slot.shifts = slot.shifts.filter(shift => !selectedShifts.includes(shift));
            const updatedSlot = await slot.save();

            console.log('Updated slot after deletion:', updatedSlot);
            return updatedSlot;
        } catch (error) {
            console.error('Error in deleteSlots:', error);
            throw error;
        }
    }

    async fetchDocuments(email: string): Promise<Doctor | null> {
        try {
            const doctor = await Doctors.findOne({ email }).select('documents documents_verified')
            console.log(doctor)
            return doctor

        } catch (error) {
            return null
        }
    }

    async fetchAppointments(doctorId: string): Promise<IBooking[] | null> {
        console.log('entered fetchAppointments repo')
        try {
            const AppointmentData = await Booking.find({ doctorId }).populate('patientId').sort({ date: -1 })
            console.log('fetched  appointment data', AppointmentData)
            return AppointmentData
        } catch (error) {
            throw error
        }
    }

    async getWalletHistory(doctorId: string): Promise<Doctor | null> {
        console.log('entered wallet history repo');
        try {
            const walletData = await Doctors.findById(doctorId).select('WalletHistory Wallet').sort({date: -1})
            console.log(walletData);
            return walletData
        } catch (error) {
            throw error
        }
    }

    async updateBooking(bookingId: string): Promise<IBooking | null> {
        try {
            return await Booking.findById(bookingId).exec()

        } catch (error) {
            throw error
        }
    }

    async appointments(date: string, doctorId: string): Promise<IBooking[] | null> {
        console.log('entered appointment repository')
        try {
            console.log('doctorid and date', doctorId, date)
            const inputDate = new Date(date);
            const isoDateString = inputDate.toISOString().split("T")[0];
            console.log("inputdate", inputDate)
            console.log("isodatestring", isoDateString)
            return await Booking.find({
              date: isoDateString,
              doctorId: doctorId,
            }).populate({ path: "patientId" });
          } catch (err) {
            throw err;
          }
    }

    async getNotification(doctorId: string): Promise<INotifications[] | null> {
        try {
            const notificationData = await Notification.find({ 
                doctorId, 
                recipientType: "doctor"
            }).sort({ createdAt: -1 }).exec();
            return notificationData;
        } catch (error) {
            console.error("Error fetching notifications for doctor:", error);
            throw error;
        }
    }
    

    async markAsRead(notificationId: string): Promise<INotifications | null> {
        try {
            const updatedNotification = await Notification.findByIdAndUpdate(notificationId, 
                {isRead: true},
                {new: true}
            )
            console.log(updatedNotification)
            return updatedNotification
        } catch (error) {
            throw error
        }
    }


    
    async fetchAdmin(): Promise<Patient | null> {
        try {
            return await Patients.findOne({ is_admin: true })
        } catch (error) {
            throw error
        }
    }
}

