import { Patient } from "../../models/userModel";
import { Doctor } from "../../models/doctorModel";
import { IadminService } from "./interface/IadminService";
import PatientRepository from "../../repositories/patientRepository";
import doctorRepository from "../../repositories/doctorRepository";


export default class adminService implements IadminService {
   
    private _patientsRepository: PatientRepository
    private _doctorRepository: doctorRepository
    constructor() {
       
        this._patientsRepository = new PatientRepository
        this._doctorRepository = new doctorRepository
    }
    async fetchUserList(): Promise<Patient[] | null> {
        try {
            return await this._patientsRepository.patientFetch();
        } catch (error) {
            throw error
        }
    }

    async blockUnblockPatient(id: string, status: boolean) {
        console.log('service block admin')
        try {
            const data = await this._patientsRepository.fetchPatient(id);
            if (data) {
                console.log('before', data)
                data.is_blocked = status;
                await data.save();
                console.log('after',data)
                return data;
            } else {
                console.log('elsee')
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async blockUnblockDoctor(id: string, status: boolean): Promise<Doctor | null> {
        try {
            const doctorData = await this._doctorRepository.fetchDoctor(id);
            if (doctorData) {
                console.log('before', doctorData)
                doctorData.is_blocked = status;
                await doctorData.save();
                console.log('after',doctorData)
                return doctorData ;
            } else {
                console.log('elsee')
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    async fetchDoctorList(): Promise<Doctor[] | null> {
        try {
            return await this._doctorRepository.doctorFetch()
        } catch (error) {
            throw error
        }
    }

    async verifyDocuments(id: string): Promise<Doctor | null> {
        console.log('entered verifyDocuments service')
        try {
            const doctorData = await this._doctorRepository.fetchDoctor(id);
            if(doctorData) {
                doctorData.documents_verified = true;
                console.log('verify Doctumentss', doctorData.documents_verified)
                await doctorData.save();
                return doctorData
            } else {
                console.log('doctor data is not found')
                return null
            }
        } catch (error) {
            throw error
        }
    }
}