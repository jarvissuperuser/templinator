import {DOMElement} from "../core/index.js";


export class LiquidPage extends DOMElement {
    static get is() {return 'liquid-page'}
    HTMLTemplate() {
        return `
<div class="pg-wrapper ">
    <div class="pg-container-h w3-grid">
        <div class="vw-100 vh-100 w3-teal pg-page-h"></div> 
        <div class="vw-100 vh-100 w3-pink pg-page-h"></div> 
        <div class="vw-100 vh-100 w3-blue pg-page-h"></div>
    </div>
</div>        
        `;

    }
}
