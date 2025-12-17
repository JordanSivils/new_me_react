import z from "zod";
import { PartialUserSchema } from "../users/userSchema";

export const SupplierDetailsSchema = z.object({
    id: z.uuid(),
    userId: z.uuid(),
    user:  PartialUserSchema.optional(),
    orderDay: z.string().min(1).optional(),
    orderNotes: z.string().optional(),
    orderMinimum: z.string().min(1).optional(),
    supplierId: z.uuid(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})
export type SupplierDetails = z.infer<typeof SupplierDetailsSchema>

export const PartialSupplierDetailsSchema = SupplierDetailsSchema.partial();
export type PartialSupplierDetails = z.infer<typeof PartialSupplierDetailsSchema>;

export const CreateSupplierDetailsSchema = z.object({
    userId: z.uuid(),
    orderDay: z.string().min(1),
    orderNotes: z.string().optional(),
    orderMinimum: z.string().min(1),
    supplierId: z.uuid(),
})
export type CreateSupplierDetails = z.infer<typeof CreateSupplierDetailsSchema>;