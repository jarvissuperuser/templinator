import {image, Core} from "../core/index.js";

export class HomePage extends Core {
    static get is() {return 'home-page'}
    HTMLTemplate() {
        return `
<div class="min-80 w3-padding w3-grid  place-center">
    <div class="">
        <h1>Test Apps</h1>
        <div class="w3-center">
            <button class="w3-btn w3-green w3-large decode">Barcode Get</button>
        </div>
        <div class="w3-center">
            <button class="w3-btn w3-red w3-large">RecognizeText</button>
        </div>
    </div>
</div>
        `;
    }
    loadTargetElements() {
        super.loadTargetElements();
        this.buttons = this.getElements('button');
        this.image = image;
    }
    attachAttributesNLogic() {
        super.attachAttributesNLogic();
        this.buttons.forEach(this.addButtonListeners.bind(this));
    }
    addButtonListeners(button) {
        if (button && window?.cordova) {
            button.onclick = () => {
                if (button.classList.contains('decode'))
                    cordova.plugins.mlutil.decode(res => {
                            alert(JSON.stringify(res));
                        }, (err)=>console.log(err, 'is error'),
                        this.image
                    );
                else
                    cordova.plugins.mlutil.recognizeText(res => {
                            console.log(res);
                        }, (err)=>console.log(err, 'recog'),
                        this.image)
            }
        }
    }

}
