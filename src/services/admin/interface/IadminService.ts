import { Patient } from "../../../models/userModel";
import { Doctor } from "../../../models/doctorModel";

export interface IadminService {
    fetchUserList():Promise<Patient[] | null> 
    blockUnblockPatient(id: string, status: boolean): Promise<Patient | null>
    blockUnblockDoctor(id: string, status: boolean): Promise<Doctor | null>
    fetchDoctorList():Promise<Doctor[] | null> 
    verifyDocuments(id: string): Promise<Doctor | null>
}

