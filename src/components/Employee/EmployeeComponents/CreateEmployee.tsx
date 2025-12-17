import formStyles from "../../../styles/Form.module.css"
import Button from "../../ui/Button/Button"
import TextInput from "../../ui/FormInputs/TextInput/TextInput"
import buttonStyle from "../../ui/Button/Button.module.css"
import { useForm } from "react-hook-form"
import { CreateUserSchema, type CreateUser  } from "../../../api/users/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@clerk/react-router"
import { employeeApi } from "../../../api/users/api/employeeApi"
import { notify } from "../../ui/Toast/Toast"
type CreateEmployeeProps = {
    clerkId: string
    firstName: string
    lastName: string
    onClose: () => void
    onRefresh: () => void
}

const CreateEmployee = ({ clerkId, firstName, lastName, onClose, onRefresh }: CreateEmployeeProps) => {
    const { getToken } = useAuth();
    const { 
        register,
        handleSubmit,
        formState: { isDirty, isSubmitting }
    } = useForm<CreateUser>({
        resolver: zodResolver(CreateUserSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: { clerkId, firstName, lastName}
    })

    const onSubmit = async (data: CreateUser) => {
        const res = await employeeApi.createUser(getToken, data)
        notify.success(res.message)
        onRefresh?.()
        onClose?.()
    }
    return (
            <div className={`flex-col ${formStyles.formContainer}`}>
                <h4>Edit Employee</h4>
                {clerkId &&
                <form onSubmit={handleSubmit(onSubmit)} className={`flex-col ${formStyles.form}`}>
                    <div className={formStyles.selectContainer}>
                        <div className={`flex-col ${formStyles.inputGroup}`}>
                            <TextInput registration={register("email")} label="Email" />
                            <TextInput registration={register("phoneNumber")} label="Phone Number" />
                        </div>
                    </div>
                    <div className={`flex ${formStyles.btnGroup}`}>
                        <Button type="submit" children="Submit" disabled={!isDirty || isSubmitting} className={isDirty ? buttonStyle.createFill : buttonStyle.disabled} />
                        <Button className={buttonStyle.cancelFill}  children={`Cancel`} type="button" onClick={onClose} />
                    </div>
                </form>
                }
            </div>
    )
}

export default CreateEmployee