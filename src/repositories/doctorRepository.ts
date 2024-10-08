import Doctors, { Doctor } from "../models/doctorModel";
import { IdoctorRepository } from "./interfaces/IdoctorRepository";
import Slots, { ISlot } from "../models/slotModel";
import Booking, { IBooking } from "../models/bookingModel";

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

    async doctorFetch(): Promise<Doctor[] | null> {
        try {
            return await Doctors.find().select('-password')
        } catch (error) {
            throw error
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
        console.log('entered repository of editsingledoctor', doctorData.email)
        try {
            return await Doctors.findOne({ email: doctorData.email }).exec()
        } catch (error) {
            throw error
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
            const AppointmentData = await Booking.find({ doctorId }).populate('patientId', 'name').sort({ date: -1 })
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

}

