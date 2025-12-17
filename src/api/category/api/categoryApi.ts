import { read } from "../../fetch/read";
import type { QueryOptions } from "../../fetch/types/queryTypes";
import { buildUrl } from "../../urlBuild/buildUrl";
import { CategoryListSchema } from "../list/categoryList";

export const categoryApi = {
    list: async (getToken: () => Promise<string | null>, params: QueryOptions) => {
        const url = buildUrl("/categories", params);
        return read(getToken, url, CategoryListSchema)
    }
}