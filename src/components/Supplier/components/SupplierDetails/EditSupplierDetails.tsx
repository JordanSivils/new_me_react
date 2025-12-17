import { useForm } from "react-hook-form"
import type { PartialSupplier } from "../../../../api/supplier/supplierSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateSupplierDetailsSchema, type CreateSupplierDetails } from "../../../../api/supplierDetails.ts/supplierDetailsSchema"
import formStyles from "../../../../styles/Form.module.css"
import { notify } from "../../../ui/Toast/Toast"
import UserSelect from "../../../ui/FormInputs/ComboBox/User/UserSelect"
import { useState } from "react"
import TextInput from "../../../ui/FormInputs/TextInput/TextInput"
import TextArea from "../../../ui/FormInputs/TextArea/TextArea"
import Button from "../../../ui/Button/Button"
import buttonStyle from "../../../ui/Button/Button.module.css"
import { supplierDetailsApi } from "../../../../api/supplierDetails.ts/api/supplierDetailsApi"
import { useAuth } from "@clerk/react-router"
import Loading from "../../../loading/Loading"

type EditSupplierDetailsProps = {
    supplier: PartialSupplier
    loading: boolean
    usersId: string | null
    usersName: string | null
    onCancel: () => void
    onRefresh: () => void
}

const EditSupplierDetails = ({ supplier, loading, usersId, usersName, onCancel, onRefresh }: EditSupplierDetailsProps) => {
    const { getToken } = useAuth()
    const [userId, setUserId] = useState<string | null>(usersId)
    const [userName, setUserName] = useState<string | null>(usersName);
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
                supplierId: supplier.id,
                userId: supplier.supplierDetails?.userId,
                orderDay: supplier.supplierDetails?.orderDay,
                orderMinimum: supplier.supplierDetails?.orderMinimum,
                orderNotes: supplier.supplierDetails?.orderNotes || ""
            }
        })

        const onSubmit = async (data: CreateSupplierDetails) => {
            if (supplier.supplierDetails?.id) {
                const res = await supplierDetailsApi.patchSupplierDetails(getToken, supplier.supplierDetails?.id,data)
                notify.success(res.message)
                onRefresh?.()
                onCancel?.()
            } else {
                notify.error("Payload Missing SupplierDetail Information")
            }
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
                    <Button type="submit" children="Submit" disabled={!isDirty || isSubmitting || !isValid} className={userName && isDirty && isValid ? buttonStyle.createFill : buttonStyle.disabled} />
                    <Button type="button" children="Cancel" className={buttonStyle.cancelFill} onClick={onCancel} />
                </div>
            </form>
            {loading && <Loading />}
        </div>
    )
}

export default EditSupplierDetails