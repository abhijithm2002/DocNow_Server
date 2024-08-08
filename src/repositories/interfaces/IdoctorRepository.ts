import { Doctor } from "../../models/doctorModel";

export interface IdoctorRepository {
    signupDoctor(userData: Partial<Doctor>) : Promise<Doctor | null>
    doctorFetch():Promise<Doctor[] | null >
    fetchDoctor(id: string): Promise<Doctor | null>
}