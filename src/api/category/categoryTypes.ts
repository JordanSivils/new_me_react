import z from "zod"

export const CategorySchema = z.object({
    id: z.uuid(),
    name: z.string()
})
export type Category = z.infer<typeof CategorySchema>

export const PartialCategorySchema = CategorySchema.partial();
export type PartialCategory = z.infer<typeof PartialCategorySchema>;