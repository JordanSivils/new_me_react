import type { PartialSupplier } from "../../../../api/supplier/supplierSchema"
import Loading from "../../../loading/Loading"
import Button from "../../../ui/Button/Button"
import buttonStyle from "../../../ui/Button/Button.module.css"
import detailsStyles from "../../../../styles/Details.module.css"

type ViewSupplierDetailsProps = {
    supplier: PartialSupplier
    loading: boolean
    onEdit: () => void
    onClose: () => void
}

const ViewSupplierDetails = ({ supplier, loading, onEdit, onClose }: ViewSupplierDetailsProps) => {
    return (
        <div className={`flex-col ${detailsStyles.detailsContainer}`}>
            {supplier.supplierDetails ? (
                <div className={`flex-col ${detailsStyles.detailsGroup}`}>
                    <div>
                        <h3>{supplier?.name}</h3>
                    </div>
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Ordered By:</h5>
                        <p>{supplier?.supplierDetails?.user?.firstName} {supplier?.supplierDetails?.user?.lastName}</p>
                    </div>
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Order Day:</h5>
                        <p>{supplier.supplierDetails?.orderDay}</p>
                    </div>
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Order Minimum:</h5>
                        <p>{supplier.supplierDetails?.orderMinimum}</p>
                    </div>
                    {supplier.supplierDetails.orderNotes &&
                    <div className={`flex-col ${detailsStyles.labelAndDetail}`}>
                        <h5>Order Notes:</h5>
                        <p className={detailsStyles.renderTextArea}>{supplier.supplierDetails?.orderNotes}</p>
                    </div>
                    }
                    <div className={`flex ${detailsStyles.btnGroup}`}>
                        <Button onClick={onClose} type="button" children="Done" className={buttonStyle.createFill} />
                        <Button onClick={onEdit} className={buttonStyle.editFill} children="Edit >" type="button" />
                    </div>
                </div>
            ): (
                <h1>no supplier selected, prolly a server error</h1>
            )}
            {loading && <Loading />}
        </div>
    )
}

export default ViewSupplierDetails