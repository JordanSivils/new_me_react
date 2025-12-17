import { useEffect, useState } from "react"
import { PatchUserSchema, type PartialUser, type PatchUser } from "../../../api/users/userSchema"
import { useAuth } from "@clerk/react-router"
import { employeeApi } from "../../../api/users/api/employeeApi"
import Loading from "../../loading/Loading"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { notify } from "../../ui/Toast/Toast"
import Button from "../../ui/Button/Button"
import buttonStyle from "../../ui/Button/Button.module.css"
import formStyles from "../../../styles/Form.module.css"
import TextInput from "../../ui/FormInputs/TextInput/TextInput"

type EditEmployeeProps = {
    id: string
    onClose: () => void
    onRefresh: () => void
}

const EditEmployee = ({ id, onClose, onRefresh }: EditEmployeeProps) => {
    const { getToken } = useAuth()
    const [loading, setLoading] = useState(false)
    const [employee, setEmployee] = useState<PartialUser | null>(null)

    const { 
        register, 
        handleSubmit, 
        reset,
        formState: { isDirty }   
    } = useForm<PatchUser>({
        resolver: zodResolver(PatchUserSchema),
        defaultValues: {
            email: "",
            phoneNumber: ""
        }
    })

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await employeeApi.getUserById(getToken, id)
                reset ({
                email: res.data.email ?? "",
                phoneNumber: res.data.phoneNumber ?? ""
            })
                setEmployee(res.data)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])

    const onSubmit = async (data: PartialUser) => {
        try {
            const res = await employeeApi.patchUser(getToken, id, data);
            notify.success(res.message);
            onRefresh?.()
            onClose?.()
            
        } catch (error) {
            
        }
    }
    return (
        <div className={`flex-col ${formStyles.formContainer}`}>
            <h4>Edit Employee</h4>
            {employee &&
            <form onSubmit={handleSubmit(onSubmit)} className={`flex-col ${formStyles.form}`}>
                 <div className={formStyles.selectContainer}>
                    <div className={`flex-col ${formStyles.inputGroup}`}>
                        <TextInput registration={register("email")} label="Email" />
                        <TextInput registration={register("phoneNumber")} label="Phone Number" />
                    </div>
                    
                </div>
                <div className={`flex ${formStyles.btnGroup}`}>
                    <Button type="submit" children="Submit" disabled={!isDirty} className={isDirty ? buttonStyle.createFill : buttonStyle.disabled} />
                    <Button className={buttonStyle.cancelFill}  children={`Cancel`} type="button" onClick={onClose} />
                </div>
                
            </form>
            }    
            {loading && <Loading />}
        </div>
    )
}

export default EditEmployee