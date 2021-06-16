import {HomePage} from "./pages/index.js";
import {declarer, PageView} from "./core/index.js";

export const components = [
    HomePage,
    PageView
]

export const registerPage = components => {
    declarer(components);
}
