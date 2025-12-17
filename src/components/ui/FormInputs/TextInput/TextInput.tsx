import type { UseFormRegisterReturn } from "react-hook-form"
import textStyles from "./TextInput.module.css"

type TextInputProps = { 
    placeholder?: string
    searchValue?: string
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    registration?: UseFormRegisterReturn
    label?: string
}

const TextInput = ({ placeholder, searchValue, onSearchChange, registration, label }: TextInputProps) => {
    return (
        <div className={`flex-col ${textStyles.inputContainer}`}>
            {label && <label>{label}</label>}
            <input 
            className={textStyles.input}
            type="text"
            placeholder={placeholder}
            value={searchValue}
            onChange={onSearchChange}
            {...registration}
            />
        </div>
        
    )
}

export default TextInput