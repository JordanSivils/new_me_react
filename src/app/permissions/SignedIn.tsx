import { useUser } from "@clerk/react-router"
import { Navigate, Outlet } from "react-router";

const SignedInPermission = () => {
    const { isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return null;
    if (!isSignedIn) return <Navigate to={'/'} />

    return <Outlet />
}

export default SignedInPermission