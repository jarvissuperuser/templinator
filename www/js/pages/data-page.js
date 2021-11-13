import {DOMElement, modelMixIn, inputMixin, win, navigate, uuid} from "../core/index.js";
import {TableModel} from "../shared/index.js";

export class DataPage extends inputMixin(modelMixIn(DOMElement)){
    static get is() {return 'data-page'}
    HTMLTemplate() {
        return `
<div class="vh-100 w3-padding w3-black">
    <h3 class="w3-center bold">New Template</h3>
    <div class="w3-grid place-center min-75">
        <div class="w3-col s11">
        <app-input label="Template's Name" title="Enter Template's Name" name="title"></app-input>
        <app-input label="Business' Name" title="Enter Business Name" name="business"></app-input>
        <app-input label="Contact Number" title="Enter Contact Number" name="customerContact"></app-input>
        <app-input label="Author's Name" title="Enter Author's Name" name="author"></app-input>
        <app-input label="Author's Email" title="Enter Author's Email" name="authorContact"></app-input>
        <div class="w3-padding-top">
            <select name="docType" id="selectDocType" class="w3-select w3-black" title="Select Template Type">
           
                <option value="">Select Template Type</option>
                <option value="Invoice">Invoice</option>
                <option value="Quote">Quote</option>
                <option value="Receipt">Receipt</option>
            </select>
        </div>
        <div class="w3-padding-top w3-center">
            <button class="w3-button w3-teal save">Save Template</button>
        </div>
        </div>
    </div>
</div>        
        `;
    }
    loadTargetElements() {
        this.model =  new TableModel();
        this.loadInputs();
        this.button = this.getElements('button.save')[0];
        this.selectType = this.getElements('select[name=docType]')[0];

    }
    attachAttributesNLogic() {
        this.inputListener();
        this.addButtonClickEvent();
        this.selectTypeEvent();
    }
    addButtonClickEvent() {
        this.button.onclick = () => {
            // console.log(this.model);
            this.model.date = Date.now();
            this.model.id = uuid().toLowerCase();
            win.saveInput = new CustomEvent('addToDatabase', {detail: {model:this.model, dataKey:'template'}});
            win.dispatchEvent(win.saveInput);
            navigate('templates');
        }
    }
    selectTypeEvent() {
        this.selectType.onchange = (event) => {
            this.model.docType = event.target.value;
        }

    }
}
