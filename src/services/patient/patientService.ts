import { Patient } from "../../models/userModel";
import { IpatientService } from "./interfaces/IpatientService";
import PatientRepository from "../../repositories/patientRepository";



export default class patientService implements IpatientService {
    private _patientRepository: PatientRepository
    constructor() {
        this._patientRepository = new PatientRepository()
    }

    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            return await this._patientRepository.signupPatient(userData)
        } catch (error) {
            throw error
        }
    }

    async editPatient(userData: Partial<Patient>): Promise<Patient | null> {
        console.log('coming to edit patient service');
        
        try {
            const data = await this._patientRepository.editSinglePatient(userData)
            console.log("updated", data)
            if(data) {
                data.name = userData.name ?? data.name
                data.email = userData.email ?? data.email
                data.mobile = userData.mobile ?? data.mobile
                data.photo = userData.photo ?? data.photo
                data.gender = userData.gender ?? data.gender
                console.log('updated',data);
                
                await data.save();
                return data;
            } else {
                return null
            }
        } catch (error) {
            throw error
        }
    }
}