import z from "zod";

export const FileUploadSchema = z.object({
    file: z.instanceof(File, { message: "file is required"})
        // .refine(files => files.length > 0, "File Required to Submit")
        // .refine(files => files[0]?.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Only .xlsx Files accepted")
})

export type FileUpload = z.infer<typeof FileUploadSchema>
export const FileUploadSuccess = z.object({
    ok: z.boolean(),
    message: z.string()
})
export type FileUploadSuccess = z.infer<typeof FileUploadSuccess>
export type ApiError = {
    ok: false
    status: number
    reason: string
    message?: string
    field?: string
}

export type FileUploadResponse = ApiError | FileUploadSuccess