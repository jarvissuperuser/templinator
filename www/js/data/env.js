import {win} from "../core/index.js";

export const setEnv = () => {
    if (!win.$$$) {
        win.$$$ = {
            expenses: [],
            add: (expense) => {
                win.$$$.expenses.push(expense);
                localStorage.setItem('expenses', JSON.parse(win.$$$.expenses));
            },
            list: () => win.$$$.expenses,
            get: (filter) => win.$$$.expenses.filter(ex => `${ex.expense} ${ex.date}`.toLowerCase().includes(filter.toLowerCase()))

        };
        if (localStorage.getItem('expenses')) win.$$$.expenses.push(...JSON.parse(localStorage.expenses))
    }
    console.log('env setup');
};

export const setVar = (key,value) => {
    if (!win.$$$) setEnv();
    win.$$$[key] = value;
};

export const getVar = (key) => {
    return win.$$$[key] | null;
}
