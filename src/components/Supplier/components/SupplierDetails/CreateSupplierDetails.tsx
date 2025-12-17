import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreateSupplierDetailsSchema, type CreateSupplierDetails } from "../../../../api/supplierDetails.ts/supplierDetailsSchema"
import { supplierDetailsApi } from "../../../../api/supplierDetails.ts/api/supplierDetailsApi"
import { useAuth } from "@clerk/react-router"
import { notify } from "../../../ui/Toast/Toast"
import formStyles from "../../../../styles/Form.module.css"
import TextInput from "../../../ui/FormInputs/TextInput/TextInput"
import UserSelect from "../../../ui/FormInputs/ComboBox/User/UserSelect"
import { useState } from "react"
import TextArea from "../../../ui/FormInputs/TextArea/TextArea"
import Button from "../../../ui/Button/Button"
import buttonStyle from "../../../ui/Button/Button.module.css"

type CreateSupplierDetailsProps = {
    supplierId: string
    onRefresh: () => void
    onClose: () => void
}

const CreateSupplierDetailsForm = ({ supplierId, onRefresh, onClose }: CreateSupplierDetailsProps) => {
    const { getToken } = useAuth()
    const [userId, setUserId] = useState<string | null>(null)
    const [userName, setUserName] = useState<string | null>(null);
    const { 
        register, 
        handleSubmit,
        setValue,
        formState: { isDirty, isSubmitting, isValid }    
    } = useForm<CreateSupplierDetails>({
        resolver: zodResolver(CreateSupplierDetailsSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: { 
            supplierId,
            userId: ""
        }
    })

    const onSubmit = async (data: CreateSupplierDetails) => {
        const res = await supplierDetailsApi.createSupplierDetails(getToken, data);
        notify.success(res.message)
        onRefresh?.()
        onClose?.()
    }

    return (
        <div className={`flex-col ${formStyles.formContainer}`} >
            <h4>Create Supplier Details ..Enter name..</h4>
            <form onSubmit={handleSubmit(onSubmit, (errors) => {
                    console.log("FORM ERRORS", errors);
                    notify.error("Form invalid");
                    })} className={`flex-col ${formStyles.form}`}>
                <div className={formStyles.selectContainer}>
                    <div className={`flex-col ${formStyles.inputGroup}`}>
                        <UserSelect 
                        valueId={userId || ""}
                        label="Who Orders?"
                        onChange={(option) => {
                            const id = option?.id ?? "";
                            setUserId(id)
                            setUserName(option?.name ?? null)
                            setValue("userId", id, {
                            shouldDirty: true,
                            shouldValidate: true,
                            });
                        }}
                        />
                        <TextInput registration={register("orderDay")} label="Order Day" />
                        <TextInput registration={register("orderMinimum")} label="Minimum Order?" />
                        <TextArea registration={register("orderNotes")} label="Special Notes" />
                    </div>
                </div>
                <div className={`flex ${formStyles.btnGroup}`}>
                    <Button type="submit" children="Submit" disabled={!isDirty || isSubmitting || !isValid} className={isDirty && isValid && userName ? buttonStyle.createFill : buttonStyle.disabled} />
                    <Button type="button" children="Cancel" className={buttonStyle.cancelFill} onClick={onClose} />
                </div>
            </form>
        </div>
    )
}

export default CreateSupplierDetailsForm;