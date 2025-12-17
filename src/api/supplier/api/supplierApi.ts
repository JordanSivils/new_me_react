import { getById } from "../../fetch/getById"
import { read } from "../../fetch/read"
import type { QueryOptions } from "../../fetch/types/queryTypes"
import { nonListSchema } from "../../types/responses/createResponse"
import { buildUrl } from "../../urlBuild/buildUrl"
import { SupplierListSchema } from "../list/supplierList"
import { PartialSupplierShcema } from "../supplierSchema"


export const supplierApi = {
    list: async (getToken: () => Promise<string | null>, params: QueryOptions) => {
        const url = buildUrl("/suppliers", params)
        return read(getToken, url, SupplierListSchema)
    },
    getSupplierById: async (getToken: () => Promise<string | null>, id: string) => {
        const url = `/supplier/${id}`;
        return getById(getToken, url, nonListSchema(PartialSupplierShcema))
    }
}