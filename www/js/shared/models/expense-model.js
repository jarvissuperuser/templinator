export class ExpenseModel{
    constructor() {
        this.id = '';
        this.expense = '';
        this.description = '';
        this.amount = 99.99;
        this.date = `${Date.now()}`;
    }
}
