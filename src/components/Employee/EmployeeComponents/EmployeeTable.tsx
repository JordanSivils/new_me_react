import { useEffect, useState } from "react"
import type { PartialClerkUser } from "../../../api/users/clerk/clerkSchema"
import type { PartialUser } from "../../../api/users/userSchema"
import type { ColumnDef } from "../../ui/Table/Table"
import Button from "../../ui/Button/Button";
import buttonStyle from "../../ui/Button/Button.module.css"
import Table from "../../ui/Table/Table";
import { employeeApi } from "../../../api/users/api/employeeApi";
import { useAuth } from "@clerk/react-router";
import Portal from "../../ui/Portal/Portal";
import CreateEmployee from "./CreateEmployee";
import EditEmployee from "./EditEmployee";
import Loading from "../../loading/Loading";
import RequireRole from "../../../app/permissions/RequireRole";

const EmployeeTable = () => {
    const { getToken } = useAuth()
    const [clerkEmployee, setClerkEmployee] = useState<PartialClerkUser[]>([]);
    const [mooreEmployee, setMooreEmployee] = useState<PartialUser[]>([]);
    const [loading, setLoading] = useState(false);
    const [clerkId, setClerkId] = useState<string | null>(null)
    const [mooreId, setMooreId] = useState<string | null>(null)
    const [firstName, setFirstName] = useState<string | "">("")
    const [lastName, setLastName] = useState<string | "">("");
    const [createUserOpen, setCreateUserOpen] = useState(false)
    const [editUserOpen, setEditUserOpen] = useState(false)
    const [refresh, setRefresh] = useState(0)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await employeeApi.bothUsersList(getToken)
                setClerkEmployee(res.clerkData)
                setMooreEmployee(res.meData)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken, refresh])

    const clerkColumns: ColumnDef<PartialClerkUser>[] =[
        {
            id: "firstName",
            header: "First Name",
            cell: (row) => row.firstName
        },
        {
            id: "lastName",
            header: "Last Name",
            cell: (row) => row.lastName
        },
        {
            id: "create",
            header: "Create",
            cell: (row) => <Button
                            className={buttonStyle.detail}
                            onClick={() => {
                                setCreateUserOpen(true)
                                setClerkId(row.id || null)
                                setFirstName(row.firstName || "")
                                setLastName(row.lastName || "")
                            }}
                            type="button"
                            children="Create User"
                            />
        }
    ]

    const mooreColumns: ColumnDef<PartialUser>[] = [
        {
            id: "name",
            header: "Name",
            cell: (row) => `${row.firstName} ${row.lastName}`,
        },
        {
            id: "email",
            header: "Email",
            cell: (row) => row.email
        },
        {
            id: "phone",
            header: "Phone Number",
            cell: (row) => row.phoneNumber
        },
        {
            id: "edit",
            header: "Edit",
            cell: (row) => <Button
                            className={buttonStyle.edit}
                            onClick={() => {
                                setEditUserOpen(true)
                                setMooreId(row.id || null)
                            }}
                            children="Edit"
                            />
        }
    ]

    const handleRefresh = () => setRefresh(n => n + 1)
    return (
        <div className={`body-container`}>
            {clerkId && clerkEmployee &&
                <Portal isOpen={createUserOpen} onClose={() => setCreateUserOpen(false)}>
                <CreateEmployee 
                clerkId={clerkId}
                firstName={firstName}
                lastName={lastName}
                onClose={() => setCreateUserOpen(false)}
                onRefresh={handleRefresh}
                />
            </Portal>
            }
            
            <Portal isOpen={editUserOpen} onClose={() => setEditUserOpen(false)}>
                <EditEmployee
                id={mooreId || ""}
                onClose={() => {
                    setEditUserOpen(false)
                    setMooreId("")
                }}
                // onRefresh={() => handleRefresh()}
                onRefresh={handleRefresh}
                />
            </Portal>
            {clerkEmployee.length > 0 &&
                <RequireRole anyOf={["manager", "owner", "admin", "dev"]}>
                <h4>Not Created</h4>
                <Table
                data={clerkEmployee ?? []}
                columns={clerkColumns}
                getRowKey={(row) => row.id || ""}
                />
            </RequireRole>
            }
            <h4>Employees</h4>
            <Table
            data={mooreEmployee}
            columns={mooreColumns}
            getRowKey={(row) => row.id || ""}
            />
            {loading && <Loading />}
        </div>
    )
}

export default EmployeeTable