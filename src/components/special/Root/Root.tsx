import { SignedIn, SignedOut, SignInButton } from "@clerk/react-router"
import { Navigate } from "react-router"
import styles from "./Root.module.css"
const Root = () => {
    return (
        <>
            <SignedIn>
                <Navigate to={"/home"} />
            </SignedIn>
            <div className={styles.rootFlex}>
                <SignedOut>
                    <div className={styles.rootContainer}>
                    <img src="/assets/me_icon.webp" height={300} width={300} />
                    <h3 className={styles.openingText}>You Must Be Signed In To Use This App</h3>
                    <SignInButton>
                        <button className={styles.signIn}>Sign in</button>
                    </SignInButton>
                    </div>
                    
                </SignedOut>
            </div>
        </>
    )
}

export default Root