import type { ReactNode } from "react"
import { useRoles } from "./parseRoll"

type RequireRoleProps = {
    anyOf?: string[]
    allOf?: string[]
    loading?: ReactNode
    fallback?: ReactNode
    children: ReactNode 
}

const RequireRole = ({
    anyOf,
    allOf,
    loading = null,
    fallback = null,
    children
}: RequireRoleProps) => {
    const { isLoaded, isSignedIn, hasAny, hasAll } = useRoles();

    if (!isLoaded) return <>{loading}</>
    if (!isSignedIn) return <>{fallback}</>

    if (allOf && !hasAll(allOf)) return null
    if (anyOf && !hasAny(anyOf)) return null

    return <>{children}</>
}

export default RequireRole