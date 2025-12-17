import { create } from "../../fetch/create"
import { getById } from "../../fetch/getById"
import { patch } from "../../fetch/patch"
import { read } from "../../fetch/read"
import { nonListSchema } from "../../types/responses/createResponse"
import { BothUserSetsListSchema } from "../clerk/bothUsersList"
import { UserListSchema } from "../list/UserList"
import { PartialUserSchema, type PartialUser } from "../userSchema"

export const employeeApi = {
    meList: (getToken: () => Promise<string | null>) => {
        const url = "/me-users?limit=100"
        return read(getToken, url, UserListSchema)
    },
    bothUsersList: (getToken: () => Promise<string | null>) => {
        const url = "/users"
        return read(getToken, url, BothUserSetsListSchema)
    },
    createUser: (getToken: () => Promise<string | null>, user: PartialUser) => {
        const url = "/me/user"
        return create(getToken, url, nonListSchema(PartialUserSchema), user)
    },
    patchUser: (getToken: () => Promise<string | null>, id:string, user: PartialUser) => {
        const url = `/me/user/${id}`
        return patch(getToken, url, nonListSchema(PartialUserSchema), user)
    },
    getUserById: (getToken: () => Promise<string | null>, id: string) => {
        const url = `/me/user/${id}`
        return getById(getToken, url, nonListSchema(PartialUserSchema))
    }
    // deleteUser: (getToken: () => Promise<string | null>, id: string) => {
    //     const url = `/me/user/${id}`
    // }
}