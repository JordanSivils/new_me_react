import { SignedIn, UserButton } from "@clerk/react-router"
import styles from "./Sidebar.module.css"
import anchorStyles from "../../ui/Anchor/Anchor.module.css"
import RequireRole from "../../../app/permissions/RequireRole"
import Anchor from "../../ui/Anchor/Anchor"
import { useState } from "react"
import Button from "../../ui/Button/Button"
import Portal from "../../ui/Portal/Portal"
import InventoryForm from "../../Inventory/form/InventoryForm"
import buttonStyles from "../../ui/Button/Button.module.css"
import FileUploadForm from "../../FileUpload/FileUploadForm"
const Sidebar = () => {
    const [inventoryPortalOpen, setinventoryPortalOpen] = useState(false);
    const [productsUploadOpen, setProductsUploadOpen] = useState(false);
    return (
        <div className={styles.sidebarContainer}>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Main Nav</p>
                <li className={styles.sidebarItem}><Anchor className={anchorStyles.sidebarA} href={`/home`} children="Home" /></li>
                <li className={styles.sidebarItem}><Anchor href="/products" className={`${anchorStyles.sidebarA}`} children="Products" /></li>
                <li className={styles.sidebarItem}><Anchor href="/suppliers" className={`${anchorStyles.sidebarA}`} children="Suppliers" /></li>
                <li className={styles.sidebarItem}><Anchor href="/employees" className={`${anchorStyles.sidebarA}`} children="Employees" /></li>
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Quick Tools</p>
                <li className={styles.sidebarItem}><Button onClick={() => setinventoryPortalOpen(true)} className={`${buttonStyles.sidebarBtn}`} children={`Invenotry`}/></li>
                <RequireRole anyOf={["admin", "dev", "owner", "manager"]}>
                    <li className={styles.sidebarItem}><Button children="Upload Products" onClick={() => setProductsUploadOpen(true)} className={`${buttonStyles.sidebarBtn} ${buttonStyles.txtSm}`} /></li>
                </RequireRole>
            </ul>
            <ul className={styles.sidebarItemContainer}><p className={styles.sidebarId}>Profile</p>
                <li className={styles.sidebarItem}><a href="#"><SignedIn><UserButton /></SignedIn></a></li>
            </ul>
            

            <Portal isOpen={inventoryPortalOpen} onClose={() => setinventoryPortalOpen(false)}>
                <InventoryForm onClose={() => setinventoryPortalOpen(false)} />
            </Portal>
            <RequireRole anyOf={["admin", "dev", "owner", "manager"]}>
                    <Portal isOpen={productsUploadOpen} onClose={() => setProductsUploadOpen(false)}>
                        <FileUploadForm onCancel={() => setProductsUploadOpen(false)} onSuccess={() => setProductsUploadOpen(false)} />
                    </Portal>
            </RequireRole>
        </div>
    )
}

export default Sidebar