import styles from "./Navbar.module.css"

const Navbar = () => {
    return (
        <div className={styles.navContainer}>
            <button className={styles.homeHeader}><a className={styles.title} href="/home">Moore Equine</a></button>
        </div>
    )
}

export default Navbar