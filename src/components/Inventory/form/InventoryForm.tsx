import { useRef, useState, type ChangeEvent } from "react"
import BrandSelect from "../../ui/FormInputs/ComboBox/brand/BrandSelect"
import FileInput from "../../ui/FormInputs/FileInput/FileInput"
import formStyles from "../../../styles/Form.module.css"
import Button from "../../ui/Button/Button"
import buttonStyles from "../../ui/Button/Button.module.css"
import { parseExcel, type ReturnRow } from "../excelParse/parseExcel"
import { useNavigate } from "react-router"

type InventoryFormProps = {
    onClose: () => void
}

export type StateTransfer = {
    items: ReturnRow[]
    brand: string | null
}

const InventoryForm = ({ onClose }: InventoryFormProps) => {
    const navigate = useNavigate()
    const [brandName, setBrandName] = useState<string | null>(null);
    const [brandId, setBrandId] = useState<string | null>(null);
    const [cleanRow, setCleanRow] = useState<ReturnRow[]>([])
    // const [transfer, setTransfer] = useState<StateTransfer | null>(null)

    const [excelFile, setExcelFile] = useState<File | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    
    const handleExcelUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current?.click();
        }
    }

    const updateFile = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const data = await parseExcel(file)
            setCleanRow(data)
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
            const data = await parseExcel(file)
            setCleanRow(data)
            setExcelFile(file)
            setFileName(file.name)
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const payload: StateTransfer = {items: cleanRow, brand: brandName}
        onClose?.()
        navigate("/download-inventory", {state: payload})
    }
    
    return (
        <div className={`flex-col ${formStyles.formContainer}`} onSubmit={handleSubmit}>
            <h1>Inventory Form</h1>
            <form className={`flex-col ${formStyles.form}`}>
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
                <div className={formStyles.selectContainer}>
                    <BrandSelect 
                    valueId={brandId || ""}
                    label={`Select Brand`}
                    onChange={(option) => {
                        const id = option?.id ?? ""
                        setBrandId(id)
                        setBrandName(option?.name ?? null)
                    }}
                    />
                </div>

                <div className={`flex ${formStyles.btnGroup}`}>
                    <Button 
                    className={fileName && brandName ? buttonStyles.createFill : buttonStyles.disabled} 
                    children={`Create PDF`} 
                    type="submit"
                    disabled={!fileName && !brandName}
                    />
                    <Button className={buttonStyles.cancelFill} children={`Cancel`} type="button" onClick={onClose} />
                </div>
            </form>
        </div>
    )
}

export default InventoryForm