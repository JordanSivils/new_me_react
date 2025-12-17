import z from "zod";

export const UserSchema = z.object({
    id: z.uuid(),
    clerkId: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
    // supplierDetails[]? optional
    // specialOrders[] optional
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
})
export type User = z.infer<typeof UserSchema>

// Partialized User for gets 
export const PartialUserSchema = UserSchema.partial()
export type PartialUser = z.infer<typeof PartialUserSchema>

// Patch for after creation to satisfy zod resolver
export const PatchUserSchema = z.object({
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
})
export type PatchUser = z.infer<typeof PatchUserSchema>

export const CreateUserSchema = z.object({
    clerkId: z.string().min(1),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().min(1),
    phoneNumber: z.string().min(1),
})

export type CreateUser = z.infer<typeof CreateUserSchema>