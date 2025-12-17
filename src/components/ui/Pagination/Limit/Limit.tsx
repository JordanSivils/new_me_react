import styles from "./Limit.module.css"

type LimitProps = {
    newLimit: (size: number) => void
    limit: number
    limitOpts: number[]
}

const Limit = ({ limit, limitOpts, newLimit}: LimitProps) => {
    return (
        <div className={styles.limitContainer}>
            <label>Items Per Page: {" "}
                <select value={limit} onChange={(e) => newLimit(Number(e.target.value))}>
                    {limitOpts.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </label>
        </div>
        
    )
    
}

export default Limit