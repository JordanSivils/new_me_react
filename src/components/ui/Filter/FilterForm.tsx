import type React from "react"
import filterStyles from "./Filter.module.css"
import formStyles from "../../../styles/Form.module.css"
import Button from "../Button/Button"
import buttonStyles from "../Button/Button.module.css"

type dualChild = {
    select: React.ReactNode
    button: React.ReactNode
}

type FilterProps = {
    children: dualChild[]
    onClose: () => void
    onSubmit: () => void
}

const FilterForm = ({ children, onClose, onSubmit }: FilterProps) => {
    
    return (
        <div className={`flex-col ${filterStyles.formHouse}`}>
            <h4>Filter Options</h4>
            <form className={`flex-col ${formStyles.form}`} onSubmit={onSubmit}>
                {children.map(child => (
                    <div className={`flex ${formStyles.resetGroup}`}>
                        <div>
                            {child.select}
                        </div>
                        <div>{child.button}</div>
                    </div>
                ))}
                <div className={`flex ${formStyles.btnGroup}`}>
                    <Button 
                    className={buttonStyles.createFill} 
                    children={`Apply`} 
                    type="submit"
                    />
                    <Button className={buttonStyles.cancelFill} children={`Cancel`} type="button" onClick={onClose} />
                </div>
            </form>
        </div>
    )
}

export default FilterForm