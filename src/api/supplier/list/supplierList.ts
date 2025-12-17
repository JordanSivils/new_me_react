import type z from "zod";
import { listResponse } from "../../types/responses/listResponse";
import { PartialSupplierShcema } from "../supplierSchema";

export const SupplierListSchema = listResponse(PartialSupplierShcema);
export type SupplierList = z.infer<typeof SupplierListSchema>;