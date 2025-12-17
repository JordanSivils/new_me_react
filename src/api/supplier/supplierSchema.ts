import z from "zod";
import { PartialSupplierDetailsSchema } from "../supplierDetails.ts/supplierDetailsSchema";

export const SupplierSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    _count: z.object({ items: z.coerce.number().optional()}),
    // items[]
    // specialOrders[]
    // brands[]
    supplierDetails: PartialSupplierDetailsSchema.optional().nullable(),
    createAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})
export type Supplier = z.infer<typeof SupplierSchema>

export const PartialSupplierShcema = SupplierSchema.partial();
export type PartialSupplier = z.infer<typeof PartialSupplierShcema>;