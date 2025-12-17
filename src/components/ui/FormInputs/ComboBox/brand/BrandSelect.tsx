import { useAuth } from "@clerk/react-router";
import type { ComboBoxProps } from "../types/comboBoxProps";
import { useEffect, useState } from "react";
import type { PartialBrand } from "../../../../../api/brand/brandSchema";
import { getBrandList } from "../../../../../api/brand/api/getBrandList";
import ComboBox from "../ComboBox";

const BrandSelect = ({ valueId, onChange, label}: ComboBoxProps) => {
    const { getToken } = useAuth();
    const [brands, setBrands] = useState<PartialBrand[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await getBrandList(getToken)
                setBrands(res.data.items)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])

    const options = brands.map((brand) => ({
        id: brand.id ?? "",
        name: `${brand.name}`
    }))

    return (
        <ComboBox
        valueId={valueId || ""}
        onChange={onChange}
        options={options}
        label={label}
        placeHolder={loading ? "Loading Brands" : "Select Brand"}
        />
    )
}

export default BrandSelect