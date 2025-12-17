import styles from "./Paginate.module.css"

type PaginationProps = {
    nextPage?: boolean
    previousPage?: boolean
    currentPage: number
    totalPages: number
    total: number
    onNext: () => void
    onPrev: () => void
}


const Paginate = ({ nextPage, previousPage, currentPage, totalPages, total, onPrev, onNext}: PaginationProps) => {
    const previous = previousPage ?? currentPage > 1
    const next = nextPage ?? currentPage < totalPages
    return (
    <div className={`${styles.paginationContainer} flex`}>
        <button onClick={onPrev} disabled={!previous}>Prev</button>
        <p>{currentPage}/{totalPages}</p>
        <button onClick={onNext} disabled={!next}>Next</button>
        <p>Total: {total}</p>
    </div>
    )
}

export default Paginate