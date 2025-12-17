import { baseUrl } from "../../../api/url";
import type { FileUploadResponse } from "../types/fileUploadTypes";

export const fileUpload = async (url: string, body: FormData, token: string): Promise<FileUploadResponse> => {
    try {
        const response = await fetch(`${baseUrl}${url}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: body
        })
        const text = await response.text()
        const json = text ? JSON.parse(text) : {};

        if (!response.ok || json?.ok === false) {
            return {
                ok: false,
                status: json?.status ?? response.status,
                message: json?.message ?? response.statusText
            }
        }

        return {
            ok: true,
            message: json.status ?? response.status,
        } as FileUploadResponse
    } catch (err: any) {
        return {
            ok: false,
            status: 0,
            reason: "NETWORK_ERROR",
            message: err.message ?? "Make sure the server is running and you are connected to the internet."
        }
    }
}