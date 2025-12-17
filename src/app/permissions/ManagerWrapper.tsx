import { Outlet } from "react-router";
import { useRoles } from "./parseRoll"
import Loading from "../../components/loading/Loading";
import Unauthorized from "../../components/special/Unauthorized/Unauthorized";

const ManagerWrapper = () => {
    const { hasAny, isLoaded, isSignedIn } = useRoles();

    if (!isLoaded) return <Loading />
    if (!isSignedIn || !hasAny(["manager", "admin", "dev", "owner"])) return <Unauthorized />
    return (
        <Outlet />
    )
}

export default ManagerWrapper;