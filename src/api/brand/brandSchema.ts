import z from "zod";

export const BrandSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1),
    // special orders [] optional
    // suppliers [] optional
    // items
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date()
})
export type Brand = z.infer<typeof BrandSchema>

export const PartialBrandSchema = BrandSchema.partial();
export type PartialBrand = z.infer<typeof PartialBrandSchema>