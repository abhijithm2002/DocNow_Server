import { Patient } from "../../../models/userModel";

export interface IpatientService {
    signupPatient(userData: Partial<Patient>): Promise < Patient | null>
    editPatient(userData : Partial<Patient>) : Promise <Patient | null >
}