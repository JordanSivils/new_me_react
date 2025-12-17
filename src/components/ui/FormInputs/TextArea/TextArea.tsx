import type { UseFormRegisterReturn } from "react-hook-form"
import textAreaStyles from "./TextArea.module.css"

type TextAreaProps = {
    placeholder?: string
    registration?: UseFormRegisterReturn
    label?: string
}

const TextArea = ({ placeholder, registration, label}: TextAreaProps) => {
    return (
        <div className={`flex-col ${textAreaStyles.textAreaContainer}`}>
            {label && <label>{label}</label>}
            <textarea
            placeholder={placeholder}
            className={textAreaStyles.textArea}
            {...registration}
            />
        </div>
    )
}

export default TextArea