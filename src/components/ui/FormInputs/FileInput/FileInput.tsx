import { type ChangeEvent, type RefObject } from "react"
import fileStyles from "./FileInput.module.css"
import Button from "../../Button/Button"
import buttonStyles from "../../Button/Button.module.css"

type FileInputProps = {
    accept: string
    handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
    handleFileDrop: (e: React.DragEvent<HTMLDivElement>) => void
    handleExcelUploadClick: () => void
    excelFile: File | null
    fileName: string | null
    fileInputRef: RefObject<HTMLInputElement | null>
    updateFile: (e: ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
}
const FileInput = ({ 
    accept, 
    handleDragOver,
    handleFileDrop,
    handleExcelUploadClick,
    excelFile,
    fileName,
    fileInputRef,
    updateFile,
    onClear,
}: FileInputProps) => {
    return (
        <div className={`flex-col ${fileStyles.fileInputContainer}`}>
            <p>Inventory File</p>
            <div
            className={fileStyles.fileContainer}
            onDragOver={handleDragOver}
            onDrop={handleFileDrop}
            onClick={handleExcelUploadClick}
            >
                {excelFile && fileName? (
                    <p>{fileName}</p>
                ) :
                (
                    <div>
                        <label>Click To upload or Drag & Drop File</label>
                        <input 
                        className={fileStyles.inputBox}
                        type="file" 
                        ref={fileInputRef}
                        accept={accept}
                        style={{ display: "none"}}
                        onChange={updateFile}
                        placeholder="Drag file here"
                        />
                    </div>
                    
                )}
            </div>
            {excelFile && 
                <Button
                className={buttonStyles.clear} 
                onClick={onClear} 
                // {
                //     setExcelFile(null)
                //     setFileName(null)
                // }}
                children={`Clear File`}
                />
            }
            
        </div>
    )
}

export default FileInput