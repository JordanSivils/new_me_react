import type z from "zod";
import { listResponse } from "../../types/responses/listResponse";
import { PartialUserSchema } from "../userSchema";

export const UserListSchema = listResponse(PartialUserSchema);
export type UserList = z.infer<typeof UserListSchema>;