import { PDFViewer } from "@react-pdf/renderer";
import InventoryPdf from "../Pdf/InventoryPdf";
import { useLocation } from "react-router";
import type { ReturnRow } from "../excelParse/parseExcel";

type PdfState = {
    items: ReturnRow[]
    brand: string
}

const InventoryPdfPage = () => {
    const { state } = useLocation() as { state: PdfState}
    return (
        <PDFViewer style={{ width: "100%", height: "100%"}}>
            <InventoryPdf
            data={state.items}
            brand={state.brand}
            />
        </PDFViewer>
    )
}

export default InventoryPdfPage