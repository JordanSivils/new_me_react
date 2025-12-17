import z from "zod";

export const ClerkUserSchema = z.object({
    id: z.string().min(1),
    userName: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1)
})
export type ClerkUser = z.infer<typeof ClerkUserSchema>
export const PartialClerkUserSchema = ClerkUserSchema.partial();
export type PartialClerkUser = z.infer<typeof PartialClerkUserSchema>;