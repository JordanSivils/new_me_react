import { useRef, useState, type ChangeEvent } from "react"
import FileInput from "../ui/FormInputs/FileInput/FileInput"
import { useForm } from "react-hook-form"
import { FileUploadSchema, type FileUpload } from "./types/fileUploadTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@clerk/react-router"
import { notify } from "../ui/Toast/Toast"
import { fileUpload } from "./api/SendFile"
import formStyles from "../../styles/Form.module.css"
import Button from "../ui/Button/Button"
import buttonStyles from "../ui/Button/Button.module.css"

type FileUploadFormProps = {
    onCancel: () => void
    onSuccess: () => void
}

const FileUploadForm = ({ onCancel, onSuccess }: FileUploadFormProps) => {
    const { getToken } = useAuth()
    const [excelFile, setExcelFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)


    const { 
        handleSubmit, setValue, reset, 
        formState: { isDirty }
    } = useForm<FileUpload>({
        resolver: zodResolver(FileUploadSchema)
    })

    const handleExcelUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click();
        }
    }

    const updateFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setValue("file", file, { shouldValidate: true, shouldDirty: true })
            setExcelFile(file)
            setFileName(file.name)
        }
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setValue("file", file, { shouldValidate: true, shouldDirty: true })
            setExcelFile(file)
            setFileName(file.name)
        }
    }

    const onSubmit = async (data: FileUpload) => {
         const token = await getToken();
        if (!token) {
            notify.error("no user credentials")
            return
        };
        try {
            const formData = new FormData()
            formData.append("file", data.file) // ✅ data.file is File

            const res = await fileUpload("/upload/products", formData, token)
            notify.success(res.message || "res didnt work but... Failed Successfully?")
            reset()
            onSuccess?.()
        } catch (error) {
            
        }

        const formData = new FormData()
        formData.append("file", data.file) // ✅ data.file is File

        await fileUpload("/api/upload", formData, token)

    }
    return (
        <div className={`flex-col ${formStyles.formContainer}`}>
            <h4>Upload Entire Inventory</h4>
            <p>Please speak to Jordan before submitting this.</p>
            <form onSubmit={handleSubmit(onSubmit)} className={`flex-col ${formStyles.form}`}>
                <div>
                    <FileInput
                    accept="xlsx"
                    handleDragOver={handleDragOver}
                    handleFileDrop={handleFileDrop}
                    handleExcelUploadClick={handleExcelUploadClick}
                    updateFile={updateFile}
                    excelFile={excelFile || null}
                    fileInputRef={fileInputRef}
                    fileName={fileName}
                    onClear={() => {
                                setExcelFile(null)
                                setFileName(null)
                            }} 
                    />
                </div>
                <div className={`flex ${formStyles.btnGroup}`}>
                    <Button 
                    className={fileName && isDirty ? buttonStyles.createFill : buttonStyles.disabled} 
                    children={`Upload`} 
                    type="submit"
                    disabled={!fileName && !isDirty}
                    />
                    <Button className={buttonStyles.cancelFill} children={`Cancel`} type="button" onClick={onCancel} />
                </div>
        </form>
        </div>
        
    )
}

export default FileUploadForm