import { Patient } from "../../../models/userModel";
import { Doctor } from "../../../models/doctorModel";

export interface IpatientService {
    signupPatient(userData: Partial<Patient>): Promise < Patient | null>
    editPatient(userData : Partial<Patient>) : Promise <Patient | null >
    fetchDoctorDetails(id: string): Promise<Doctor | null >
}