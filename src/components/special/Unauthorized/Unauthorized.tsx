import styles from "./Unauthorized.module.css";

const Unauthorized = () => {
    return (
        <div className={`${styles.unauthorizedContainer} flex-col`}>
            <h1>Unauthorized</h1>
            <p>If this incorrect, contact Jordan or a Manager to fix.</p>
            <a href="/home">Return Home</a>
        </div>
        
    )
}

export default Unauthorized