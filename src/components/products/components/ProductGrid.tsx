import React, { useEffect, useState } from "react"
import type { PartialProduct } from "../../../api/products/productTypes"
import { useAuth } from "@clerk/react-router";
import { productApi } from "../../../api/products/api/productsApi";
import type { ColumnDef } from "../../ui/Table/Table";
import Table from "../../ui/Table/Table";
import tableStyles from "../../ui/Table/Table.module.css"
import Loading from "../../loading/Loading";
import Button from "../../ui/Button/Button";
import buttonStyles from "../../ui/Button/Button.module.css"
import TableTopper from "../../ui/Table/TableTopper";
import { useDebounce } from "../../../api/debounce/debounce";
import topperStyles from "../../ui/Table/TableTopper.module.css"
import Limit from "../../ui/Pagination/Limit/Limit";
import Paginate from "../../ui/Pagination/Paginate/Paginate";
import Portal from "../../ui/Portal/Portal";
import ProductDetails from "./ProductDetails";
import filterStyles from "../../ui/Filter/Filter.module.css"
import FilterForm from "../../ui/Filter/FilterForm";
import BrandSelect from "../../ui/FormInputs/ComboBox/brand/BrandSelect";
import type { QueryOptions } from "../../../api/fetch/types/queryTypes";
import SupplierSelect from "../../ui/FormInputs/ComboBox/supplier/SupplierSelect";
import CategorySelect from "../../ui/FormInputs/ComboBox/category/CategorySelect";
import productStyles from "./ProductGrid.module.css"

const ProductTable = () => {
    const { getToken } = useAuth()
    const [products, setProducts] = useState<PartialProduct[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 700);
    const [nextPage, setNextPage] = useState(false);
    const [previousPage, setPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0);
    const [filterOpen, setFilterOpon] = useState(false)
    const [tempBrandName, setTempBrandName] = useState<string | undefined>(undefined);
    const [tempSupplierName, setTempSupplierName] = useState<string | undefined>(undefined);
    const [tempCategoryName, setTempCategoryName] = useState<string | undefined>(undefined);
    const [query, setQuery] = useState<QueryOptions>({
        page: 1,
        limit: 25,
        search: "",
        sortby: "description",
        sortdir: "asc",
        brand: undefined,
        supplier: undefined,
        category: undefined,
        status: undefined
    })
    const [brandSelectKey, setBrandSelectKey] = useState(0);
    const [cateogoryKey, setCategoryKey] = useState(0);
    const [supplierKey, setSupplierKey] = useState(0);
    const [negativeCheck, setNegativeCheck] = useState(false);

    useEffect(() => {
        setQuery(prev => ({
            ...prev,
            page: 1,
            search: debouncedSearch
        }))
    }, [debouncedSearch])

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const res = await productApi.list(getToken, query)
                setProducts(res.data.items)
                setNextPage(res.data.nextPage || false);
                setPreviousPage(res.data.previousPage || false);
                setTotalPages(res.data.totalPages);
                setTotal(res.data.total);
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken, query])

    useEffect(() => {
}, [query])

    const productColumns: ColumnDef<PartialProduct>[] = [
        {
            id: "description",
            header: <div className={`flex ${tableStyles.sortGroup}`}>
                        <p>Description</p>
                        <Button 
                        onClick={() => {
                        setQuery(prev => ({
                            ...prev,
                                sortby: "description",
                                sortdir: query.sortdir === "asc" ? "desc" : "asc"
                            }))
                        }}
                        children={query.sortdir === "asc" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                        </svg>
                    )}
                    className={buttonStyles.create}
                    />
                     </div>,
            cell: (row) => row.description
        },
        {
            id: "available",
            header: <div className={`flex ${tableStyles.sortGroup}`}>
                <p>Availalble</p>
                <Button 
                onClick={() => {
                setQuery(prev => ({
                    ...prev,
                        sortby: "available",
                        sortdir: query.sortdir === "asc" ? "desc" : "asc"
                    }))
                }}
                children={query.sortdir === "asc" ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5"/>
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4"/>
                    </svg>
                )}
                className={buttonStyles.create}
                />
                </div>,
            cell: (row) => row.available
        },
        {
            id: "brand",
            header: "Brand",
            cell: (row) => row.brand?.name,
        },
        {
            id: "supplier",
            header: "Suppliers",
            cell: (row) => row.suppliers?.map(sup => (<ul key={sup.id}><li>{sup.name}</li></ul>))
        },
        {
            id: "category",
            header: "Category",
            cell: (row) => row.category?.name
        },
        {
            id: "details",
            header: "Details",
            cell: (row) => <Button 
                            className={`${buttonStyles.detail}`} 
                            type="button"
                            children="Details"
                            onClick={() => {
                                setActiveId(row.id || "")
                                setDetailModalOpen(true)
                            }}
                            />
        }
    ]

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onNext = () => {
        if (!query.page) {
            throw new Error("no page")
        }
        nextPage && setQuery(prev => ({
            ...prev,
            page: query.page + 1 
        }))
    }

    const onPrev = () => {
        if (!query.page) {
            throw new Error("no page")
        }
        previousPage && setQuery(prev => ({
            ...prev,
            page: query.page - 1
        }))
    }
    const handleLimit = (nextSize: number) => {
        setQuery(prev => ({
            ...prev,
            page: 1,
            limit: nextSize
        }))
        
    }

    const limitOpts = [15, 25, 50, 100]

    const onFilterSubmit = (e?: React.FormEvent) => {
        e?.preventDefault()

        setQuery(prev => {
            return {
            ...prev,
            brand: tempBrandName,
            supplier: tempSupplierName,
            category: tempCategoryName,
            page: 1,
            };
        });
        setFilterOpon(false)
    }

    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNegativeCheck(e.target.checked)
        if (negativeCheck === false) {
            setQuery(prev => ({
                ...prev,
                status: "negative"
            }))
        } else {
            setQuery(prev => ({
                ...prev,
                status: undefined
            }))
        }
    }
   

    return (
        <div className="body-container">
            <Portal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
                <ProductDetails onClose={() => setDetailModalOpen(false)} productId={activeId || ""} />
            </Portal>
            <TableTopper
            title="Products"
            searchValue={searchValue}
            onSearchChange={handleSearch}
            placeHolder="Find Proucts"
            rightContent={
                <div className={`flex-col ${topperStyles.end}`}>
                    <Limit 
                    newLimit={handleLimit}
                    limitOpts={limitOpts}
                    limit={query.limit}
                    />
                    <Paginate
                    total={total}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    currentPage={query.page}
                    totalPages={totalPages}
                    onNext={onNext}
                    onPrev={onPrev}
                    />
                </div>
            }
            />
            <div className={`flex ${productStyles.filterContainer}`}>
                <Button children={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z"/>
                </svg>
                } 
                onClick={() => setFilterOpon((prev) => !prev)} className={buttonStyles.create}
                />
            <div>
                <label >Negative Inventory </label>
                <input 
                type="checkbox"
                checked={negativeCheck}
                onChange={handleCheckChange}
                />
            </div>
            </div>
            
            <div className={filterOpen ? filterStyles.formContainer : filterStyles.closed}>
                <FilterForm 
                onClose={() => setFilterOpon(false)}
                onSubmit={onFilterSubmit}
                children= {[
                            {
                                select: <BrandSelect 
                                key={brandSelectKey}
                                valueId={tempBrandName ?? ""}
                                onChange={(option) => {
                                    setTempBrandName(option?.name ?? undefined)
                                }}
                            />, 
                            button: <Button
                            onClick={() =>{
                                    setTempBrandName(undefined);
                                    setBrandSelectKey(prev => prev + 1);
                                }} 
                                type="button"
                                children="Reset"
                                className={buttonStyles.edit}
                            />
                            },
                            {
                                select: <SupplierSelect 
                                    key={supplierKey}
                                    valueId={tempSupplierName}
                                    onChange={(option) => {
                                    setTempSupplierName(option?.name ?? undefined)
                                    }}
                                    />,
                                button: <Button 
                                onClick={() => {
                                    setTempSupplierName(undefined)
                                    setSupplierKey(prev => prev + 1)
                                }}
                                children="Reset"
                                type="button"
                                className={buttonStyles.edit}
                                />
                            },
                            {
                                select: <CategorySelect
                                key={cateogoryKey}
                                valueId={tempCategoryName}
                                onChange={(option) => {
                                    setTempCategoryName(option?.name)
                                }}
                                />,
                                button: <Button 
                                        onClick={() => {
                                            setTempCategoryName(undefined)
                                            setCategoryKey(prev => prev + 1)
                                        }}
                                        type="button"
                                        children="Reset"
                                        className={buttonStyles.edit}
                                        />
                            }
                        ]
                    }
                />
            </div>
            <Table
            data={products ?? []}
            columns={productColumns}
            getRowKey={(row) => row.id || ""}
        />
        {loading && <Loading />}
        </div>
        
    )
}

export default ProductTable