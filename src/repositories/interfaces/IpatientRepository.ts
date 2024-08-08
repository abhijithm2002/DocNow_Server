import { Patient } from "../../models/userModel";

export interface IpatientRepository {
    signupPatient(userData: Partial<Patient>): Promise<Patient | null >
    patientFetch():Promise<Patient[] | null >
    fetchPatient(id: string): Promise<Patient | null>
    editSinglePatient(userData: Partial<Patient>) : Promise< Patient| null >
    
}