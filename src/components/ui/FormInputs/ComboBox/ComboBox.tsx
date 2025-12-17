import { useEffect, useRef, useState } from "react"
import inputStyles from "./ComboBox.module.css"
import buttonStyles from "../../../ui/Button/Button.module.css"
import Button from "../../Button/Button"

type BaseOptions = {
    id: string
    name: string
    count?: number
}

type SelectInputProps<T extends BaseOptions = BaseOptions> = {
    options: T[]
    valueId: string
    onChange: (option: T | null) => void
    errorMessage?: string
    label?: string
    placeHolder?: string
}

const ComboBox = <T extends BaseOptions>({
    placeHolder, 
    valueId, 
    options, 
    onChange, 
    label, 
    errorMessage
}: SelectInputProps<T>) => {
    const [listOpen, setListOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const openList = () => setListOpen(true)

    

    const selectedOption = options.find((opt) => opt.id === valueId) ?? null

    useEffect(() => {
        if (selectedOption) {
            setInputValue(selectedOption.name)
        } else {
            setInputValue("")
        }
    }, [selectedOption?.id])

    useEffect(() => {
        const handleOffClick = (e: MouseEvent) => {
            if (!wrapperRef.current) return

            const target = e.target as Node

            if (!wrapperRef.current.contains(target)) {
                setListOpen(false)
            }
        }
        document.addEventListener("mousedown", handleOffClick)
        return () => {
            document.removeEventListener("mousedown", handleOffClick)
        }
    }, [])

    const filteredOptions = inputValue ? options.filter((opt) => opt.name.toLowerCase().includes(inputValue.toLowerCase())) : options
    
    const handleSelect = (opt: T) => {
        onChange(opt)
        setInputValue(opt.name)
        setListOpen(false)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
        setListOpen(true)

        if (selectedOption && value !== selectedOption.name) {
            onChange(null);           // tell parent: "selection is no longer valid"
        }
    }
    return (
        <div className={inputStyles.inputContainer} ref={wrapperRef}>
            {label && <label>{label}</label>}
            <div className={`${inputStyles.textInputContainer} flex`}>
                <input 
                type="text"
                className={inputStyles.input}
                onClick={openList}
                placeholder={placeHolder}
                value={inputValue}
                onChange={handleInputChange}
                />    
                <Button 
                type="button"
                className={buttonStyles.selectBtn} 
                children={
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    className={`${inputStyles.chevron} ${listOpen ? inputStyles.chevronOpen : ""}`}   
                    viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
                    </svg>
                }
                onClick={() => setListOpen((x) => !x)}
                />
            </div>
            {listOpen && (
                <div className={`${listOpen ? inputStyles.listOpen : ""}`}>
                    {filteredOptions.map(opt => (
                        <div
                        key={opt.id}
                        className={inputStyles.listRow}
                        onClick={() => handleSelect(opt)}
                        >
                            <span>{opt.name}</span>
                            <span>{opt?.count}</span>
                        </div>
                    ))}

                    {filteredOptions.length === 0 && (
                        <div className={inputStyles.emptyState}>No results</div>
                    )}
                </div>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    )
}

export default ComboBox