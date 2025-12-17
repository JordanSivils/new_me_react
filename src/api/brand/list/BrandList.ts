import z from "zod";
import { listResponse } from "../../types/responses/listResponse";
import { PartialBrandSchema } from "../brandSchema";

export const BrandListSchema = listResponse(PartialBrandSchema);
export type BrandList = z.infer<typeof BrandListSchema>;