import { read } from "../../fetch/read"
import { BrandListSchema } from "../list/BrandList"

export const getBrandList = (getToken: () => Promise<string | null>) => {
    const url = "/brands?limit=100"
    return read(getToken, url, BrandListSchema)
}