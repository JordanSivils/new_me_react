import { create } from "../../fetch/create";
import { patch } from "../../fetch/patch";
import { nonListSchema } from "../../types/responses/createResponse";
import { PartialSupplierDetailsSchema, type PartialSupplierDetails } from "../supplierDetailsSchema";

export const supplierDetailsApi = {
    createSupplierDetails: async (getToken: () => Promise<string | null>, supplierDetails: PartialSupplierDetails) => {
        const url = `/supplier-details`;
        return create(getToken, url, nonListSchema(PartialSupplierDetailsSchema), supplierDetails)
    },
    patchSupplierDetails: async (getToken: () => Promise<string | null>, id: string,supplierDetails: PartialSupplierDetails) => {
        const url = `/supplier-details/${id}`;
        return patch(getToken, url, nonListSchema(PartialSupplierDetailsSchema), supplierDetails)
    }
}