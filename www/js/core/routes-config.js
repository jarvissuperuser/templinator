import {doc, hash} from './index.js';
import {PageView} from './mix-ins/page-view.js';
import {setEnv} from '../data/env.js';

export const routes = [
    {path: 'home', view: {element: '<explore-page></explore-page>'},visible: true},
    {path: 'templates', view: {element: '<list-page></list-page>'},visible: true},
    {path: 'expense', view: {element: '<expense-page></expense-page>'},visible: true},
    {path: 'editor', view: {element: '<editor-page></editor-page>'},visible: true},
    {path: 'composer', view: {element: '<compose-page></compose-page>'},visible: true},
    {path: 'add', view: {element: '<data-page></data-page>'},visible: true},
    {path: 'item', view: {element: '<item-page></item-page>'},visible: false},
    {path: 'report', view: {element: '<pie-page></pie-page>'},visible: false},
    {path: 'chat', view: {element: '<chat-page></chat-page>'},visible: true},
];
export const navigate = (route) => {

    doc.querySelector(PageView.is).setAttribute('page',route);
}
export const getRoutePath = () => {
    return hash().split('#');
}
export const excludedPaths = () => {
    return ['home/page'];
}
export const excludedPathPattern = (path) => {
    return excludedPaths().filter(pattern => path.indexOf(pattern) > 0).length
}
export const init = _ => {
    let route = hash().split('/')[1];
    if (!(hash().indexOf('home/page')>0)) {
        location.hash = route;
    }
    setEnv();
}

export const resolvePath = () => {
    // console.log(getRoutePath());
    routes.some(loc => {
        const route = getRoutePath();
        if ( `${loc.path}` === route[1]) {
            navigate(loc.path);
            return true;
        }
        navigate(routes[0].path);
    });
}
