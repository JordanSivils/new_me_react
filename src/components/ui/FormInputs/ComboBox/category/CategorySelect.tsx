import { useAuth } from "@clerk/react-router";
import type { ComboBoxProps } from "../types/comboBoxProps";
import { useEffect, useState } from "react";
import type { PartialCategory } from "../../../../../api/category/categoryTypes";
import { categoryApi } from "../../../../../api/category/api/categoryApi";
import ComboBox from "../ComboBox";

const CategorySelect = ({ valueId, onChange, label}: ComboBoxProps) => {
    const { getToken } = useAuth();
    const [categories, setCategories] = useState<PartialCategory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await categoryApi.list(getToken, { page: 1, limit: 100});
                setCategories(res.data.items)
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken])

    const options = categories.map((category) => ({
        id: category.id ?? "",
        name: `${category.name}`
    }))

    return (
        <ComboBox
        valueId={valueId || ""}
        onChange={onChange}
        options={options}
        label={label}
        placeHolder={loading ? "Loading Categories" : "Select Category"}
        />
    )
}

export default CategorySelect