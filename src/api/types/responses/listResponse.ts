import z from "zod";

export const PaginationResponseSchema = z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().min(1).max(400).default(25),
    total: z.coerce.number(),
    totalPages: z.coerce.number(),
    previousPage: z.boolean().optional(),
    nextPage: z.boolean().optional(),
    // item: [] goes here
})
export type PaginationResponse = z.infer<typeof PaginationResponseSchema>

export const listResponse = <TItem extends z.ZodTypeAny>(itemSchema: TItem) => 
    z.object({
        ok: z.boolean(),
        status: z.coerce.number(),
        message: z.string(),
        data: PaginationResponseSchema.extend({
            items: z.array(itemSchema)
        })
    })

export type ListResponse<T extends z.ZodTypeAny> = z.infer<ReturnType<typeof listResponse<T>>>