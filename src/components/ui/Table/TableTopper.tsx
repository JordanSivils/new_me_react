import type { ReactNode } from "react"
import topperStyles from "./TableTopper.module.css"
import TextInput from "../FormInputs/TextInput/TextInput"

type TableTopperProps = {
    title: string
    searchValue?: string
    onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeHolder?: string
    rightContent?: ReactNode
}

const TableTopper = ({
    title,
    searchValue,
    onSearchChange,
    placeHolder = "Search...",
    rightContent
}: TableTopperProps) => {
    return (
        <div className={`flex ${topperStyles.topperContainer}`}>
            <div className={`flex-col ${topperStyles.start}`}>
                <h3>{title}</h3>
                {/* <input 
                type="text"
                value={searchValue}
                onChange={onSearchChange}
                placeholder={placeHolder}
                /> */}
                <TextInput 
                placeholder={placeHolder} 
                searchValue={searchValue}
                onSearchChange={onSearchChange}
                />
            </div>
            {rightContent && <>{rightContent}</>}
            
        </div>
    )
}

export default TableTopper