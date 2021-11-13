import {DataPage, HomePage, InvoicePage, LiquidPage, ListPage, PiePage} from "./pages/index.js";
import {TableHead, InvoiceTable, TableBody, TableRow, AppInput, TemplateRow, AppNav,} from "./shared/index.js"
import {declarer, PageView} from "./core/index.js";



export const components = [
    HomePage,
    InvoicePage,
    PiePage,
    LiquidPage,
    DataPage,
    PageView,
    ListPage
]

export const shared = [
    AppInput,
    TableHead,
    InvoiceTable,
    TableBody,
    TableRow,
    TemplateRow,
    AppNav
]

export const registerPage = components => {
    declarer(components);
}
