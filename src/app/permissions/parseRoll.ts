import { useUser } from "@clerk/react-router"

type Mode = "any" | "all"

export const useRoles = () => {
    const { user, isLoaded, isSignedIn } = useUser();

    const roles: string[] = Array.isArray(user?.publicMetadata.role) ? (user!.publicMetadata.role as string[]) : [];

    const hasRole = (required: string | string[], mode: Mode = "any") => {
        const req = Array.isArray(required) ? required : [required];
        if (req.length === 0) return true
        if (!roles.length) return false
        return mode === "any"
        ? req.some((r) => roles.includes(r)) 
        : req.every((r) => roles.includes(r))
    }

    const hasAny = (r: string | string[]) => hasRole(r, "any")
    const hasAll = (r: string | string[]) => hasRole(r, "all")

    return {
        isLoaded,
        isSignedIn: 
        !!isSignedIn && !!user, 
        roles, 
        hasRole, 
        hasAny, 
        hasAll
    }
}