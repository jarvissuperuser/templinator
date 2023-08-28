import {DOMElement, inputMixin, modelMixIn} from "../core";

export class SalesPage extends inputMixin(modelMixIn(DOMElement)){
    static get is() {return 'sales-page'}
    HTMLTemplate() {
        return `
<div class="vh-100 w3-padding w3-black">
    <h3 class="w3-center bold">Welcome</h3>
    <div class="w3-grid place-center min-75">
        <div class="w3-col s12 w3-container w3-animate-zoom">
            <div class="w3-padding w3-col s12">
                <div class="w3-card w3-amber w3-round w3-round-large w3-padding w3-padding-16">
                    <h3>Total sales</h3>
                </div>
            </div>
            <div class="w3-padding w3-col s6 m3">
                <div data-href="/#expense" class="w3-card w3-padding w3-teal w3-round w3-round-large">
                    <h3>Costs</h3>
                    <p class="tx-of">Manage your costs</p>
                </div>
            </div>
            <div class="w3-padding w3-col s6 m3">
                <div data-href="/#sales" class="w3-card w3-padding w3-teal w3-round w3-round-large">
                    <h3>Sales</h3>
                    <p class="tx-of">Record your sales</p>
                </div>
            </div
            ><div class="w3-padding w3-col s6 m3">
                <div class="w3-card w3-padding w3-teal w3-round w3-round-large">
                    <h3>Tasks</h3>
                    <p class="tx-of">Manage your Tasks</p>
                </div>
            </div>
            <div class="w3-padding w3-col s6 m3">
                <div class="w3-card w3-padding w3-teal w3-round w3-round-large">
                    <h3>Office</h3>
                    <p class="tx-of">Make new templates</p>
                </div>
            </div>
        </div>
        <div class="white-gap"></div>
    </div>
</div>`;
    }

}
