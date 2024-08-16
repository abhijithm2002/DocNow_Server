import { Doctor } from "../../../models/doctorModel";
import { ISlot } from '../../../models/slotModel'


export interface IdoctorService {
    signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null>
    editDoctor(doctorData: Partial<Doctor>): Promise<Doctor | null>
    uploadDocuments(doctorData: Partial<Doctor>): Promise<Doctor | null>
    fetchDocuments(email: string): Promise<Doctor | null >
    updateSlots(slotsData: any): Promise<ISlot[] | null>
    fetchSlots(id: string, date: string): Promise<ISlot[] | null>
}