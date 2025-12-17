import type { UseFormRegisterReturn } from "react-hook-form"

export type ComboBoxProps = {
    valueId?: string
    onChange: (options: {id: string, name:string} | null) => void
    label?: string
    error?:string 
    registration?: UseFormRegisterReturn
}