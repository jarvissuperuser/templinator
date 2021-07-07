import {HomePage, InvoicePage, LiquidPage, SpinningPage} from "./pages/index.js";
import {TableHead, InvoiceTable, TableBody, TableRow,} from "./shared/index.js"
import {declarer, PageView} from "./core/index.js";

export const components = [
    HomePage,
    InvoicePage,
    SpinningPage,
    LiquidPage,
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
