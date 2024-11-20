import { IBooking } from "../../models/bookingModel";
import { Doctor } from "../../models/doctorModel";
import Slots, { ISlot } from "../../models/slotModel";
import { INotifications } from "../../models/notificationModel";

export interface IdoctorRepository {
    signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null>
    doctorFetch(): Promise<Doctor[] | null>
    fetchDoctor(id: string): Promise<Doctor | null>
    editSingleDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null>
    insertSlots(slotsData: ISlot[]): Promise<ISlot[] | null>
    fetchSlots(id: string, date: string): Promise<ISlot[] | null>
    deleteSlots(slotId: string, selectedShifts: string[]): Promise<ISlot | null>
    fetchDocuments(email: string): Promise<Doctor | null>;
    fetchAppointments(doctorId: string): Promise<IBooking[] | null >
    getWalletHistory(doctorId: string): Promise<Doctor | null >
    updateBooking(bookingId: string): Promise<IBooking | null>
    appointments(date:string,doctorId:string):Promise<IBooking[]|null>
    getNotification(doctorId:string):Promise<INotifications[]|null>
    markAsRead(notificationId:string):Promise<INotifications|null>
}