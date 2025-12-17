import type z from "zod";
import { notify } from "../../components/ui/Toast/Toast";
import { baseUrl } from "../url";

export const create = async <ResponseSchema extends z.ZodTypeAny, Body>(
    getToken: () => Promise<string | null>,
    url: string,
    resSchema: ResponseSchema,
    body: Body,
    init?: RequestInit
): Promise<z.infer<ResponseSchema>> => {
    const token = await getToken()
    if (!token) {
        notify.error("No User Credentials")
        throw new Error("No User Credentials")
    }

    const res = await fetch(`${baseUrl}${url}`, {
        ...init,
        method: "POST",
        headers: {
            ...(init?.headers || {}),
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (!res.ok) {
        notify.error("Server Error")
        throw new Error(`Failed: ${res.status}`)
    }

    const json = await res.json();
    return resSchema.parse(json)
}