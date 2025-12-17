import type z from "zod";
import { listResponse } from "../../types/responses/listResponse";
import { PartialCategorySchema } from "../categoryTypes";

export const CategoryListSchema = listResponse(PartialCategorySchema);
export type CategoryList = z.infer<typeof CategoryListSchema>