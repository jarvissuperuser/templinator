import {registerPage, components, shared} from './js/loader.js'
import {resolvePath} from "./js/core/index.js";

registerPage(components);
registerPage(shared);


window.addEventListener('DOMContentLoaded',() => {
    console.log('loading')
    resolvePath()
})


window.onhashchange = () => {
    resolvePath()
}
