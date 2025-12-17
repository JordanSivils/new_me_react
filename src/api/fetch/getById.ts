import type z from "zod";
import { notify } from "../../components/ui/Toast/Toast";
import { baseUrl } from "../url";

export const getById = async <S extends z.ZodTypeAny>(
    getToken: () => Promise<string | null>,
    url: string,
    schema: S,
    init?: RequestInit
): Promise<z.infer<S>> => {
    const token = await getToken();
    if (!token) {
            notify.error("No User Credentials")
            throw new Error("No User Credentials")
        }
    
        const res = await fetch(`${baseUrl}${url}`, {
            ...init,
            headers: {
                ...(init?.headers || {}),
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
    
        if (!res.ok) {
            notify.error("Server Error");
            throw new Error(`Failed with status: ${res.status}`)
        }
    
        const json = await res.json();
        return schema.parse(json)
}