import {DOMElement, modelMixIn, inputMixin, win, navigate, uuid, addEl} from "../core/index.js";
import {MiniCard, MiniModel, TableModel} from "../shared/index.js";

export class ExplorePage extends inputMixin(modelMixIn(DOMElement)){
    static get is() {return 'explore-page'}
    HTMLTemplate() {
        return `
<div class="vh-100 w3-padding w3-light-gray">
    <h3 class="w3-center bold">Welcome</h3>
    <div class="w3-grid place-center min-75">
        <div class="w3-col s12 w3-container w3-animate-zoom">
            <div class="w3-padding w3-col s12">
                <div class="w3-card w3-amber w3-round w3-round-large w3-padding w3-padding-16">
                    <h3>3 unpaid Invoices</h3>
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
</div>        
        `;
    }
    loadTargetElements() {
        this.model =  new TableModel();
        this.container = this.getElements('.w3-container')[0];
        this.cardTemplate = addEl(MiniCard.is);

    }
    attachAttributesNLogic() {
        // get all html entities from 25a0 and place them on mini card
        this.newArray = [];
        const start = parseInt('25a0', 16);
        this.navWithMiniCard();
        /*for(let a = 0; a < 4; a++) {
            const model = new MiniModel();
            const card = new MiniCard();
            model.title = `&#x${(start+a).toString(16)};`;
            model.detail = (start+a).toString(16)
            card.model = model;
            this.container.appendChild(card);
        }*/
    }
    navWithMiniCard () {
        this.cards = this.getElements('div.w3-card.w3-teal');
        this.cards.forEach(card => card.onclick = (ev) => {
            let trgt = ev.target;
            while (Object.keys(trgt.dataset).length === 0){
                trgt = trgt.parentElement;
            }
            location.href = trgt.dataset.href;
        });
    }
    addButtonClickEvent() {
    }
    selectTypeEvent() {
        this.selectType.onchange = (event) => {
            this.model.docType = event.target.value;
        }

    }
}
