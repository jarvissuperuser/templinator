import {DOMElement, inputMixin, modelMixIn} from "../core";


export class ComposePage extends inputMixin(modelMixIn(DOMElement)) {
    static get is() {
        return 'compose-page'
    }
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
}
