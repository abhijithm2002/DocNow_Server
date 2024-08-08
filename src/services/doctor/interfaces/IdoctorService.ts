import { Doctor } from "../../../models/doctorModel";


export interface IdoctorService {
    signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null>
}