import {DataPage, HomePage, InvoicePage, LiquidPage, PiePage} from "./pages/index.js";
import {TableHead, InvoiceTable, TableBody, TableRow, AppInput,} from "./shared/index.js"
import {declarer, PageView} from "./core/index.js";


export const components = [
    HomePage,
    InvoicePage,
    PiePage,
    LiquidPage,
    DataPage,
    PageView
]

export const shared = [
    AppInput,
    TableHead,
    InvoiceTable,
    TableBody,
    TableRow
]

export const registerPage = components => {
    declarer(components);
}
