import {addEl, addElSVG, doc, DOMElement, modelMixIn} from "../core/index.js";
import {getVar, setEnv, setVar} from "../data/env.js";

/**
 *
 * @extends DOMElement
 * @extends ModelBase
 * */
export class PiePage extends modelMixIn(DOMElement) {
    static get is() {return 'pie-page'}

    HTMLTemplate() {
        return `
<h3 class="w3-center">Report</h3>
<div class="w3-padding w3-half">
    <svg viewBox="0 0 1000 1000" class="" > 
       
        
        
<!--        <circle stroke="black" cx="50" cy="50" r="30"></circle>-->
        <g> 
<!--            <path stroke=""></path>-->
        </g>
    </svg>
</div>
<div class="w3-padding"> 
    <input type="text" class="w3-input" placeholder="Set Ip">
    <div class="w3-row"><span>{{ip}}</span></div>
</div> 
<style>
 path:hover {
    transform: scale(1.1);
    transform-origin: center;
    z-index: 1;
    transition: ease-in-out transform .3s;
 }
</style>       
        `
    }
    loadTargetElements() {

        this.colors = [
            '#a0fe55',
            '#fea055',
            '#55fea0',
            '#55a0fe',
            '#fe55a0',
            '#a055fe'
        ]
        this.paths = [];
        this.container = this.getElements('g')[0];
        this.pathTemplate = addEl('path');
        this.mkValues();
        this.generatePie();
        this.generatePaths()
        this.input = this.getElements('input')[0];
        this.input.onchange = this.setIpOnChange;
        setEnv();
        if (getVar('ip')){ this.ip = getVar('ip');}
        super.loadTargetElements();
    }
    setIpOnChange(ev) {
        setVar('ip', ev.target.value);
        if (getVar('ip')){ this.ip = getVar('ip');}
        console.log('ip added', this.ip);
        super.interpolate();
    }
    generatePie() {
        this.pieChart = [];
        let accumulator = 0;
        this.pie.forEach((item, index) => {
            const prev = this.getPrevious(index);
            accumulator += prev;
            this.pieChart.push({
                start: accumulator,
                end: accumulator + this.doAngleMath(item),
                color: this.colors[index%this.colors.length]
            })
        })
    }
    generatePaths() {
        this.pieChart.forEach((piece, index) => {
            let clone = addElSVG('path');
            clone.setAttribute('d', this.createSvgArc(500, 500, 400, piece.start, piece.end))
            clone.setAttribute('fill', piece.color);
            const title = addElSVG('title')
            title.textContent = (this.pie[index].toString())
            clone.appendChild(title);
            this.paths.push(clone);
        });
        this.paths.forEach(item => this.container.appendChild(item));
    }
    getPrevious(index) {
        return index - 1 < 0? 0 : this.doAngleMath(this.pie[index - 1]);
    }
    doAngleMath(item) {
        return (item/this.pieTotal) * 360;
    }

    mkValues() {
        this.pie =  this.pie?this.pie:[40,30,60,50,70];
        this.pieTotal = this.pie.reduce((a,b) => a + b);
    }

    deg2Rad(deg) {
        return deg * Math.PI/180;
    }

    createSvgArc(x, y, r, degStart, degEnd) {
        let startAngle = this.deg2Rad(degStart);
        let endAngle  = this.deg2Rad(degEnd);
        let largeArc = endAngle - startAngle <= Math.PI ? 0 : 1;

        return [
            "M",
            x,
            y,
            "L",
            x + Math.cos(startAngle) * r,
            y - Math.sin(startAngle) * r,
            "A",
            r,
            r,
            0,
            largeArc,
            0,
            x + Math.cos(endAngle) * r,
            y - Math.sin(endAngle) * r,
            "L",
            x,
            y
        ].join(" ");
    }

}
