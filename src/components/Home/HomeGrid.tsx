
import styles from './HomeGrid.module.css';

const HomeGrid = () => {
    return (
        <div className={`${styles.gridContainer} grid-auto`}>
                <div>
                    <a href="/home">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Home</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(48, 209, 88)" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                            </svg>
                            <p>Home Page</p>
                        </div>
                    </a>
                </div>
                
                <div>
                    <a href="/products">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Products</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(48, 209, 88)" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                            </svg>
                            <p>Negative Inventory, and more!</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/suppliers">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Suppliers</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(48, 209, 88)" viewBox="0 0 16 16">
                                <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
                            </svg>
                            <p>Suppliers & Details</p>
                        </div>
                    </a>
                </div>
                <div>
                    <a href="/employees">
                        <div className={`${styles.gridCard} flex-col`}>
                            <p>Employees</p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgb(48, 209, 88)" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                            </svg>
                            <p>Contact Info</p>
                        </div>
                    </a>
                </div>
        </div>
    )
}

export default HomeGrid