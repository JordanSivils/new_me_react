import * as xlsx from "xlsx"

type RawRow = {
    Available: number
    Barcode: string | null
    Brand: string | null
    Category: string | null
    Cost: null | number
    Description: string
    Manufacturer: string | null
    Markup: unknown | null
    Price: number | null
    SKU: number
    Supplier: string | null
};


export type ReturnRow = {
    SKU: number
    Available: number
    Description: string
}

export const parseExcel = async (file: File): Promise<ReturnRow[]> => {
    const arrayBuffer = await file.arrayBuffer();

    const workbook = xlsx.read(arrayBuffer, { type: "array"})

    const sheetOne = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetOne];

    const rows = xlsx.utils.sheet_to_json<RawRow>(sheet, {
        defval: null
    })

    const data: ReturnRow[] = rows.map((row) => ({
        SKU: row.SKU,
        Available: row.Available,
        Description: row.Description
    }))
    console.log(data)
    return rows
    
} 