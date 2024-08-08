import Patients, { Patient } from "../models/userModel";
import { IpatientRepository } from "./interfaces/IpatientRepository";

export default class PatientRepository implements IpatientRepository {
    async signupPatient(userData: Partial<Patient>): Promise<Patient | null> {
        try {
            if(userData.photo) {
                const data = await Patients.findOne({email: userData.email})
                if(data) {
                    return data;
                } else {
                    return await Patients.create(userData)
                }
            }

            const data = await Patients.findOne({email: userData.email})
            if(data) {
                return null;
            }
            console.log('about to create user')
            console.log(userData)
            return await Patients.create(userData);
        } catch (error) {
            throw error;
        }
    }

    async patientFetch(): Promise<Patient[] | null> {
        try {
            return await Patients.find().select('-password')
        } catch (error) {
            throw error
        }
    }

    async fetchPatient(id: string): Promise<Patient | null> {
        try {
            return await Patients.findOne({_id: id}).select('-password')
        } catch (error) {
            throw error
        }
    }

    async editSinglePatient(userData: Partial<Patient>): Promise<Patient | null> {
        console.log('Entered editSinglePatient repo ',userData.email);
        try {
            const response = await Patients.findOne({email: userData.email}).exec()
            console.log('response', response)
            return response
        } catch (error) {
            throw error
        }
    }
}