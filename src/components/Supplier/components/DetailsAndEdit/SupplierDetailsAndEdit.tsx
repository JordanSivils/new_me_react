import { useEffect, useState } from "react"
import type { PartialSupplier } from "../../../../api/supplier/supplierSchema"
import { supplierApi } from "../../../../api/supplier/api/supplierApi"
import { useAuth } from "@clerk/react-router"
import ViewSupplierDetails from "../SupplierDetails/ViewSupplierDetails"
import EditSupplierDetails from "../SupplierDetails/EditSupplierDetails"

type SupplierDetailsProps = {
    id: string
    onClose: () => void
}

const SupplierDetails = ({ id, onClose }: SupplierDetailsProps) => {
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(false);
    const [supplier, setSupplier] = useState<PartialSupplier | null>();
    const [editingOpen, setEditingOpen] = useState(false)
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await supplierApi.getSupplierById(getToken, id)
                setSupplier(res.data);
                console.log(JSON.stringify(res.data.supplierDetails?.orderNotes))
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken, refresh])

    const handleRefresh = () => {
        setRefresh((prev) => prev + 1)
    }
   
    return (
        <>
        {supplier && !editingOpen &&
                <ViewSupplierDetails supplier={supplier} loading={loading} onEdit={() => setEditingOpen(true)} onClose={onClose}/>        
        }
        {supplier && editingOpen && 
            <EditSupplierDetails 
            supplier={supplier} 
            onCancel={() => setEditingOpen(false)} 
            onRefresh={handleRefresh}
            loading={loading}
            usersId={supplier.supplierDetails?.user?.id ?? ""}
            usersName={supplier.supplierDetails?.user?.firstName ?? ""}
        />
        } 
        </>
    )
}

export default SupplierDetails