import {registerPage, components, shared} from './js/loader.js'
import {resolvePath} from "./js/core/index.js";
import {setEnv} from "./js/data/env.js";

setEnv();
registerPage(components);
registerPage(shared);


window.addEventListener('DOMContentLoaded',() => {
    console.log('loading')
    resolvePath()
})


window.onhashchange = () => {
    resolvePath()
}
