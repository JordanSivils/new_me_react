import { useAuth } from "@clerk/react-router"
import { useEffect, useState } from "react"
import type { PartialUser } from "../../../../../api/users/userSchema"
import ComboBox from "../ComboBox"
import type { ComboBoxProps } from "../types/comboBoxProps"
import { employeeApi } from "../../../../../api/users/api/employeeApi"


const UserSelect = ({ valueId, onChange, label}: ComboBoxProps) => {
    const { getToken } = useAuth();
    
    const [users, setUsers] = useState<PartialUser[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const res = await employeeApi.meList(getToken)
                setUsers(res.data.items)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])

    const options = users.map((user) => ({
        id: user.id ?? "",
        name: `${user.firstName} ${user.lastName}`
    }))

    return (
        <ComboBox
        valueId={valueId || ""}
        onChange={onChange}
        options={options}
        label={label}
        placeHolder={loading ? "Loading users..." : "Select Employee"}
        />
    )
}

export default UserSelect