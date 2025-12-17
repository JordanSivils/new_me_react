type ButtonProps = {
    className: string
    onClick?: () => void
    children: React.ReactNode
    type?: "submit" | "button" | "reset"
    disabled?: boolean
}

const Button = ({ className, children, onClick, type, disabled }: ButtonProps) => {
    return (
        <button 
        type={type} 
        className={className} 
        onClick={onClick}
        disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button