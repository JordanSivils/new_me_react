import { useAuth } from "@clerk/react-router";
import type { ComboBoxProps } from "../types/comboBoxProps";
import { useEffect, useState } from "react";
import type { PartialSupplier } from "../../../../../api/supplier/supplierSchema";
import ComboBox from "../ComboBox";
import { supplierApi } from "../../../../../api/supplier/api/supplierApi";

const SupplierSelect = ({ valueId, onChange, label }: ComboBoxProps) => {
    const { getToken } = useAuth();
    const [suppliers, setSuppliers] = useState<PartialSupplier[]>([]);
    const [loading, setLoading] = useState(false)

    
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await supplierApi.list(getToken, { page: 1, limit: 200 })
                setSuppliers(res.data.items)
                console.log(res.data.items)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])

    const options = suppliers.map((supplier) => ({
        id: supplier.id ?? "",
        name: `${supplier.name}`
    }))

    return (
        <ComboBox
        valueId={valueId || ""}
        onChange={onChange}
        options={options}
        label={label}
        placeHolder={loading ? "Loading Suppliers" : "Select Supplier"}
        />
    )
}

export default SupplierSelect;