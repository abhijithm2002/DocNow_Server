import { Doctor } from "../../models/doctorModel";
import { IdoctorService } from "./interfaces/IdoctorService";
import doctorRepository from "../../repositories/doctorRepository";

export default class doctorService implements IdoctorService {
    private _doctorRepository: doctorRepository;
    constructor() {
        this._doctorRepository = new doctorRepository()
    }

    async signupDoctor(userData: Partial<Doctor>): Promise<Doctor | null> {
        try {
            return await this._doctorRepository.signupDoctor(userData)
        } catch (error) {
            throw error
        }
    }
}