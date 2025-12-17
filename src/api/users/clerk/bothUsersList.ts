import z from "zod";
import { PartialClerkUserSchema } from "./clerkSchema";
import { PartialUserSchema } from "../userSchema";

export const BothUserSetsListSchema = z.object({
    ok: z.boolean(),
    status: z.coerce.number(),
    message: z.string().min(1),
    clerkData: z.array(PartialClerkUserSchema),
    meData: z.array(PartialUserSchema)
})

export type BothUserSetsList = z.infer<typeof BothUserSetsListSchema>