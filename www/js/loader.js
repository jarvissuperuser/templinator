import {
    ChatPage,
    DataPage,
    ExpensePage,
    ExplorePage,
    HomePage,
    InvoicePage,
    LiquidPage,
    ListPage,
    PiePage
} from "./pages/index.js";
import {
    AddModal,
    AlertWrapper,
    AppAlert,
    AppInput,
    AppNav,
    AppToast, DatetimeInput, ExpenseRow,
    InvoiceTable,
    MiniCard,
    TableBody,
    TableHead,
    TableRow,
    TemplateRow
} from "./shared/index.js"
import {declarer, PageView} from "./core/index.js";



export const components = [
    HomePage,
    InvoicePage,
    PiePage,
    LiquidPage,
    DataPage,
    ChatPage,
    PageView,
    ListPage,
    ExplorePage,
    ExpensePage
]

export const shared = [
    AppInput,
    TableHead,
    InvoiceTable,
    TableBody,
    TableRow,
    TemplateRow,
    AppNav,
    AlertWrapper,
    AppAlert,
    AppToast,
    MiniCard,
    ExpenseRow,
    AddModal,
    DatetimeInput
]

export const registerPage = components => {
    declarer(components);
}
