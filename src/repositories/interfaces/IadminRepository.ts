import { IBanner } from "../../models/bannerModel";

export interface IadminRepository {
    createBanner(bannerData: Partial<IBanner>): Promise<IBanner | null>
    fetchBanner(id: string): Promise<IBanner | null>
    fetchBanners(): Promise<IBanner[] | null>
}

