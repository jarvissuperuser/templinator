import {HomePage, InvoicePage} from "./pages/index.js";
import {TableHead, InvoiceTable, TableBody, TableRow,} from "./shared/index.js"
import {declarer, PageView} from "./core/index.js";

export const components = [
    HomePage,
    InvoicePage,
    PageView
]

export const shared = [
    TableHead,
    InvoiceTable,
    TableBody,
    TableRow
]

export const registerPage = components => {
    declarer(components);
}
