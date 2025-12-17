import { read } from "../../fetch/read";
import type { QueryOptions } from "../../fetch/types/queryTypes";
import { nonListSchema } from "../../types/responses/createResponse";
import { listResponse } from "../../types/responses/listResponse";
import { buildUrl } from "../../urlBuild/buildUrl";
import { PartialProductSchema } from "../productTypes";

export const productApi = {
    list: async (getToken: () => Promise<string | null>, params: QueryOptions) => {
        const url = buildUrl("/products", params);
        return await read(getToken, url, listResponse(PartialProductSchema))
    },
    getProductById: async (getToken: () => Promise<string | null>, id: string) => {
        const url = "/item"
        return await read(getToken, `${url}/${id}`, nonListSchema(PartialProductSchema))
    }
}