import z from "zod";

export const NonListSchema = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string().min(1)
})
export type CreateResponse = z.infer<typeof NonListSchema>

export const nonListSchema = <TItem extends z.ZodTypeAny>(itemSchema: TItem) => 
    z.object({
        ok: z.boolean(),
        status: z.coerce.number(),
        message: z.string().min(1),
        data: itemSchema
    }) 
