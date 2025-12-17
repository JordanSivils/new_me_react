import type { ReactNode } from "react"
import tableStyles from "./Table.module.css"

export type ColumnDef<T> = {
    id: string
    header: ReactNode,
    cell: (row: T) => ReactNode
};

type TableProps<T> = {
    data: T[]
    columns: ColumnDef<T>[]
    getRowKey: (row: T, index: number) => string | number
    rowClick?: (row: T) => void
} 

const Table = <T,>({data, columns, getRowKey, rowClick}: TableProps<T>) => {
    return (
        <table className={tableStyles.table}>
            <thead className={tableStyles.tableHead}>
                <tr className={tableStyles.tableHeadRow}>
                    {columns.map((column) => (
                        <th key={column.id} className={tableStyles.headIdentifier}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr className={tableStyles.tableDataRow} key={getRowKey(row, rowIndex)} onClick={rowClick ? () => rowClick(row) : undefined}>
                        {columns.map((column) => (
                            <td key={column.id} className={tableStyles.colData}>{column.cell(row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table