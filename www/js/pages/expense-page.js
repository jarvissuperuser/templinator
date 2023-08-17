import {DOMElement, inputMixin, modelMixIn, doc, win, addEl, dateFormatter} from "../core/index.js"
import {AddModal, AppNav, ExpenseRow} from '../shared/index.js';
import {ExpenseModel} from "../shared/models/expense-model.js";


export class ExpensePage extends inputMixin(modelMixIn(DOMElement)) {
    static get is() {return 'expense-page'}
    HTMLTemplate() {
        return `
<div class="vh-100 w3-padding w3-black">
    <h3 class="w3-center bold">Expenses</h3>
    <div class="w3-padding">
        <app-input name="filter" label="search"> </app-input> 
    </div>
     <div class="w3-show-block rows">
         
     </div>
     <div class="w3-grid place-center documents"> 
     </div>
</div>
<div class="w3-grid cont">
    <div class="w3-col s3 w3-bottom w3-padding">
        <div class="w3-blue w3-circle w3-grid w3-center-content show-modal"><span class="w3-text-jumbo w3-even">&plus;</span></div>
    </div>
</div>
<div class="wrap"></div>
        `;
    }
    loadTargetElements() {
        this.setNav();
        this.rowWrapper = this.getElements('div.rows')[0];
        this.model = {filter: ''};
        this.rows = win.$$$.expenses;
        this.modalWrapper = this.getElements('div.wrap')[0];
        this.addExpenseModal();
        this.loadInputs();
    }
    attachAttributesNLogic() {
        this.inputListener();
        this.inputs.forEach(input => input.addEventListener('inp',(event) => {
            //console.log({val: this.model});
            if (event.target.getAttribute('name') === 'filter') {
                Array.from(this.rowWrapper.children).forEach(element => element.classList.remove('w3-hide'));
                Array.from(this.rowWrapper.children).filter(child =>
                    !child.innerText.toLowerCase().includes(event.target.value)).forEach(element => {
                    element.classList.add('w3-hide');
                });
            }
        }));
        this.rows.forEach(row => {
           this.mkRow(this, row);
        });
    }
    setNav(){
        this.appNav = doc.querySelector(AppNav.is);
        this.appNav.setAttribute('bottomNav','hide');
        this.appNav.setAttribute('topNav','hide');
        this.appNav.setAttribute('backNav','show');
    }
    unsetNav() {
        this.appNav.setAttribute('bottomNav','');
        this.appNav.setAttribute('topNav','');
        this.appNav.setAttribute('backNav','hide');
    }
    addExpenseModal() {
        this.showModal = this.getElements('div.show-modal')[0];
        this.modal = addEl(AddModal.is);
        this.modal.modalTitle = 'Add Expense';
        this.modal.model = new ExpenseModel();
        this.modalWrapper.appendChild(this.modal);
        this.showModal.onclick = () => {
            this.modal.model = new ExpenseModel();
            this.modal.model.date = dateFormatter().format(new Date(Date.now()));
            this.modal.reset()
            this.model.filter = '';
            this.modal.showModal();
        }
        this.modal.addEventListener('save', (ev) => {
            win.$$$.add(ev.detail.model);
            this.mkRow(this,ev.detail.model);
        });
    }
    mkRow(self, model) {
        const row = addEl(ExpenseRow.is);
        row.model = model;
        self.rowWrapper.appendChild(row);
    }
    disconnectedCallback() {
        this.unsetNav();
    }

}
