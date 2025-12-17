import type { PartialSupplier } from "../../../../api/supplier/supplierSchema";
import Button from "../../../ui/Button/Button";
import type { ColumnDef } from "../../../ui/Table/Table";
import buttonStyle from "../../../ui/Button/Button.module.css"
import { useEffect, useState } from "react";
import Portal from "../../../ui/Portal/Portal";
import SupplierDetails from "../DetailsAndEdit/SupplierDetailsAndEdit";
import Table from "../../../ui/Table/Table";
import { useAuth } from "@clerk/react-router";
import Loading from "../../../loading/Loading";
import { supplierApi } from "../../../../api/supplier/api/supplierApi";
import { useDebounce } from "../../../../api/debounce/debounce";
import Paginate from "../../../ui/Pagination/Paginate/Paginate";
import Limit from "../../../ui/Pagination/Limit/Limit";
import topperStyles from "../../../ui/Table/TableTopper.module.css"
import TableTopper from "../../../ui/Table/TableTopper";
import CreateSupplierDetailsForm from "../SupplierDetails/CreateSupplierDetails";

const SupplierTable = () => {
    const [loading, setLoading] = useState(false)
    const [activeId, setActiveId] = useState<string | null>(null)
    const [detailModalOpen, setDetailModalOpen] = useState(false)
    const [createModalOpen, setCreateModalOpen] = useState(false); 
    const [suppliers, setSuppliers] = useState<PartialSupplier[]>([])
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearch = useDebounce(searchValue, 700);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(25);
    const [nextPage, setNextPage] = useState(false);
    const [previousPage, setPreviousPage] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [total, setTotal] = useState(0)
    const [refresh, setRefresh] = useState(0);

    const { getToken } = useAuth()

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true)
                const res = await supplierApi.list(getToken, {
                    limit,
                    page,
                    search: debouncedSearch
                })
                setSuppliers(res.data.items);
                setPage(res.data.page);
                setLimit(res.data.limit);
                setNextPage(res.data.nextPage || false);
                setPreviousPage(res.data.previousPage || false);
                setTotalPages(res.data.totalPages);
                setTotal(res.data.total);
            } finally {
                setLoading(false)
            }
        }
        load()
    }, [getToken, limit, page, debouncedSearch, refresh])

    const supplierColumns: ColumnDef<PartialSupplier>[] = [
        {
            id: "name",
            header: "Supplier",
            cell: (row) => row.name
        },
        {
            id: "itemCount",
            header: "Product Count",
            cell: (row) => row._count?.items
        },
        {
            id: "details",
            header: "Details",
            cell: (row) => <Button
                            className={row.supplierDetails?.id ? buttonStyle.detail : buttonStyle.create}
                            onClick={row.supplierDetails?.id ? 
                                () => { 
                                    setActiveId(row.id || null)
                                    setDetailModalOpen(true)} 
                                : 
                                () => {
                                    setActiveId(row.id || null)
                                    setCreateModalOpen(true)
                                }
                            }
                            children = {row.supplierDetails?.id ? "Details" : "Create"}
                            />
        }
    ]

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const onNext = () => {
        if (!page) {
            throw new Error("no page")
        }
        nextPage && setPage(page + 1)
    }

    const onPrev = () => {
        if (!page) {
            throw new Error("no page")
        }
        previousPage && setPage(page - 1)
    }
    const handleLimit = (nextSize: number) => {
        setPage(1)
        setLimit(nextSize)
    }
    const limitOpts = [15, 25, 50, 100]

    const handleRefresh = () => {
        setRefresh((prev) => prev + 1)
    }
    return (
        <div className={`body-container`}>
            <Portal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
                {activeId && <SupplierDetails id={activeId} onClose={() => setDetailModalOpen(false)}/>}
            </Portal>
            <Portal isOpen={createModalOpen} onClose={() => setCreateModalOpen(false)}>
                {activeId && <CreateSupplierDetailsForm supplierId={activeId} onRefresh={handleRefresh} onClose={() => {
                    setCreateModalOpen(false)
                    setActiveId(null)
                    }}/>}
            </Portal>
            <TableTopper 
            title="Suppliers"
            searchValue={searchValue}
            onSearchChange={handleSearch}
            placeHolder="Filter Suppliers"
            rightContent={
                <div className={`flex-col ${topperStyles.end}`}>
                    <Limit 
                newLimit={handleLimit}
                limitOpts={limitOpts}
                limit={limit}
                />
                    <Paginate
                total={total}
                previousPage={previousPage}
                nextPage={nextPage}
                currentPage={page}
                totalPages={totalPages}
                onNext={onNext}
                onPrev={onPrev}
                />
                
                </div>
                
            }
            />
            <Table
            data={suppliers ?? []}
            columns={supplierColumns}
            getRowKey={(row) => row.id || ""}
            />
            {loading && <Loading />}
        </div>
        
    )
}

export default SupplierTable