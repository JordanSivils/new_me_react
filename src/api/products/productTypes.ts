import z from "zod";
import { PartialSupplierShcema } from "../supplier/supplierSchema";
import { PartialBrandSchema } from "../brand/brandSchema";
import { PartialCategorySchema } from "../category/categoryTypes";

export const ProductSchema = z.object({
    id: z.uuid(),
    sku: z.string().min(1),
    description: z.string().min(1),
    status: z.string().min(1),
    available: z.coerce.number().optional(),
    suppliers: z.array(PartialSupplierShcema).optional().nullable(),
    // brandId: z.uuid().optional(),
    brand: PartialBrandSchema.optional().nullable(),
    // categoryId: z.uuid().optional(),
    category: PartialCategorySchema.optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional()
});
export type Product = z.infer<typeof ProductSchema>;

export const PartialProductSchema = ProductSchema.partial();
export type PartialProduct = z.infer<typeof PartialProductSchema>;