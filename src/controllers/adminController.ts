import { Request,Response,NextFunction } from "express";
import VerificationService from "../services/patient/verificationService";
import { IadminController } from "./interfaces/IadminController";
import adminService from "../services/admin/adminService";


export default class adminController implements IadminController {
    private _adminService:adminService
    private _verificationService:VerificationService
    constructor() {
        this._adminService=new adminService()
        this._verificationService=new VerificationService()
    }

    async fetchUserList(req: Request, res: Response, next: NextFunction) {
        console.log('entered fetchuserlist admin controller')
        try {
            const data = await this._adminService.fetchUserList()
            return res.status(200).json({data})
        } catch (error) {
            throw error
        }
    }

    async blockUnblockPatient(req: Request, res: Response, next: NextFunction) {
        try {
            const {status} = req.body
            console.log(status)
            const {userId} = req.params
            console.log(userId)
            const data = await this._adminService.blockUnblockPatient(userId, status)
            if(data) {
                return res.status(200).json({ message: `Patient ${status ? 'blocked' : 'unblocked'} successfully`, data })
            } else {
                return res.status(500).json({message: 'Internal server error'})
            }
        } catch (error) {
            throw error
        }
    }

    async blockUnblockDoctor(req: Request, res: Response, next: NextFunction) {
        try {
            const {status} = req.body
            console.log(status)
            const {userId} = req.params
            console.log(userId)
            const data = await this._adminService.blockUnblockDoctor(userId, status)
            if(data) {
                return res.status(200).json({ message: `Patient ${status ? 'blocked' : 'unblocked'} successfully`, data })
            } else {
                return res.status(500).json({message: 'Internal server error'})
            }
        } catch (error) {
            throw error
        }
    }

    async fetchDoctorList(req: Request, res: Response, next: NextFunction) {
        console.log('entered doctorlist admin controller')
        try {
            const doctorData = await this._adminService.fetchDoctorList()
            return res.status(200).json({doctorData})
        } catch (error) {
            throw error
        }
    }

    async verifyDocuments(req: Request, res: Response, next: NextFunction) {
        console.log('entered verifyDocuments controller')
        try {
            const {doctorId} = req.params;
            const doctorData = await this._adminService.verifyDocuments(doctorId)
            if(doctorData) {
                return res.status(200).json({message: 'documents verified successfully', doctorData})
            } else {
                return res.status(400).json({message: 'documents verification unsuccessfull'})

            }
        } catch (error) {
            throw error
        }
    }
}