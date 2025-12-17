import type { ReactNode } from "react"
import { createPortal } from "react-dom"
import styles from "./Portal.module.css";


type PortalProps = {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

const Portal = ({ isOpen, onClose, children }: PortalProps) => {
    if (!isOpen) return null

    return createPortal(
        <div className={styles.portalContainer}>
            <div className={styles.childContainer} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.portalClose}>X</button>
                {children}
            </div>
        </div>,
        document.body
    )
}

export default Portal