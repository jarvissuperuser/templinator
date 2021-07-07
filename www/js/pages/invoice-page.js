import {addEl, DOMElement, modelMixIn} from '../core/index.js';
import {TableModel, TableBody} from "../shared/index.js";

/**
 *
 * @extends DOMElement
 * @extends modelMixIn
 * @property {InvoiceTable} table
 * */
export class InvoicePage extends modelMixIn(DOMElement) {
    static get is() {return 'invoice-page'}
    HTMLTemplate() {
        return `
<div class="min-80 vw-100">
    <div class="printable-page">
        <div class="header w3"><img src="/img/accounts.png" alt="Mukuwe Moyo Engineering" class="w3-image"></div>
        <div class="body w3-container">
            <div class="w3-row">
                <p class="w3-right"><span>{{date}}</span></p>
            </div>
            <div class="w3-row">
                <p class="w3-right">Invoice : <b><span>{{docNumber}}</span></b></p> 
            </div>
            <div class="w3-row">
            <h4>To <span>{{customerName}}</span></h4>
            </div>
            <div class="w3-row">
            <h5>&nbsp;&nbsp;<span>{{customerContact}}</span></h5>
            </div>
            <div class="small-gap"></div>
                
        </div>
        <div class="small-gap"></div>
        <div class="footer  w3-padding ">
            <p><span>{{terms}}</span><br><br></p>
            <p>
            <h5><span>{{author}}</span></h5><span>{{authorContact}}</span>
            </p>
            <div class="white-gap"></div>
        </div>
    </div>
</div>
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.buttons = this.getElements('button');
        this.container = this.getElements('.body');
        this.table = addEl('invoice-table');
        this.image = this.getElements('.header img')[0];
        this.model = this.model ?? new TableModel()
        this.table.model = this.model;
        this.container[0].appendChild(this.table);
        // console.log(this.model, this.interpolate);
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.interpolate()
        // this.buttons.forEach(this.addButtonListeners.bind(this));
    }

}
