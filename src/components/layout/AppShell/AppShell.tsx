import { Outlet } from "react-router"
import styles from "./AppShell.module.css"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
const AppShell = () => {
    return (
        <div className={styles.app}>
                <header className={styles.header}><Navbar /></header>
                <aside className={styles.sidebar}><Sidebar /></aside>
                <main className={styles.body}><div className={styles.bodyContainer}><Outlet /></div></main>
                <footer className={styles.footer}><Footer /></footer>
        </div>
    )
}

export default AppShell