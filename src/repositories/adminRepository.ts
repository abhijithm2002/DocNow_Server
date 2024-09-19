import Banner,{ IBanner } from "../models/bannerModel";
import { IadminRepository } from "./interfaces/IadminRepository";


export default class adminRepository implements IadminRepository {
    async createBanner(bannerData: Partial<IBanner>): Promise<IBanner | null> {
        try {
            return await Banner.create(bannerData)
        } catch (error) {
            throw error
        }
    }

    async fetchBanner(id: string): Promise<IBanner | null> {
        try {
            return await Banner.findOne({_id: id})
        } catch (error) {
            throw error
        }
    }

    async fetchBanners(): Promise<IBanner[] | null> {
        try {
            return await Banner.find().select('-password').sort({createdAt: -1})
        } catch (error) {
            throw error
        }
    }
}