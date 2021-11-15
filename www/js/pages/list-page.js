import {addEl, DOMElement, inputMixin, modelMixIn} from "../core/index.js";
import {listTemplates} from "../data/sources.js";
import {TableModel, TemplateRow} from "../shared/index.js";

export class ListPage extends inputMixin(modelMixIn(DOMElement)) {
    static get is() {return 'list-page'}
    HTMLTemplate() {
        return `
<div class="vh-100 w3-padding w3-black">
    <h3 class="w3-center bold">Doc Templates</h3>
     <div class="w3-grid place-center templates">
         
     </div>
     <div class="w3-grid place-center documents"> 
     </div>
</div>    

`;
    }
    loadTargetElements() {
        this.model = [];
        this.templates = this.getElements('.templates')[0];
        this.documents = this.getElements('.documents')[0];
    }

    attachAttributesNLogic() {
        this.getTemplateList()
            .then(() => this.buildTemplateList())
            .catch(err => console.log(err));
    }

    async getTemplateList() {
        const list = await listTemplates();
        // const list = {};
        const keys = Object.keys(list);
        const tList = []
        keys.forEach(key => {
            const obj =list[key];
            tList.push(obj)
        })
        this.templateList = tList
        // console.log(this.templateList);
    }

    buildTemplateList() {
        this.templateList.forEach((template) => {
            const el = addEl(TemplateRow.is);
            el.classList.add('w3-grey');
            el.classList.add('w3-border');
            el.classList.add('w3-col');
            el.classList.add('s12');
            el.model = template;
            el.onclick = () => {
                
            }
            this.templates.appendChild(el);
        })
    }
}
