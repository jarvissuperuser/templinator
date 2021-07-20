import {DOMElement, win} from "../core/index.js";

const {innerWidth, innerHeight} = win;
const MIN_LEDGE = 70;
const MARGIN_WIDTH = 30;
const curve = (cc1, cc2, to) => {
    return `C ${cc1.x} ${cc1.y}, ${cc2.x} ${cc2.y}, ${to.x} ${to.y}`
};

function vec2(x,y) {
    return {x,y}
}
// function line(point){
//     return `L ${point.x} ${point.y} `
// }
function wave(position = {}, isCaptured = false) {
    const stepY = (MIN_LEDGE - MARGIN_WIDTH) + (position.x /1.8);
    const R = 30 + (position.x / 2.1);
    const stepX = R / 2;

    const C = R * 0.5522847498;
    const p1 = new vec2(position.x - stepX, position.y - (2 * stepY))
    const p2 = new vec2(p1.x + stepX, p1.y + stepY);
    const p3 = new vec2(p2.x + stepX, p2.y + stepY);
    const p4 = new vec2(p3.x - stepX, p3.y + stepY);
    const p5 = new vec2(p4.x - stepX, p4.y + stepY);

    const c11 = new vec2(p1.x, p1.y + C);
    const c12 = new vec2(p2.x, p2.y);

    const c21 = new vec2(p2.x, p2.y );
    const c22 = new vec2(p3.x, p3.y  -C);

    const c31 = new vec2(p3.x, p3.y + C);
    const c32 = new vec2(p4.x, p4.y);

    const c41 = new vec2(p4.x, p4.y);
    const c42 = new vec2(p5.x, p5.y - C);
    // if (isCaptured) {
    //     console.log({p1, p2, p3, p4, p5, stepY, stepX})
    // }
    return [
        "M 0 0",
        `H ${p1.x}`,
        `V ${p1.y}`,
         curve(c11,c12, p2),
         curve(c21,  c22, p3),
         curve(c31,  c32, p4),
         curve(c41,  c42, p5),
        `V ${innerHeight}`,
        "H 0 Z"
    ].join(" ")
}
export class LiquidPage extends DOMElement {
    static get is() {return 'liquid-page'}
    HTMLTemplate() {
        return `
<div class="pg-wrapper ">
    <div class="pg-container-h w3-grid">
        <svg class="w3-abs liq-lay" > 
            <clipPath id="clipper"> 
<!--                <rect width="100%" height="100%" fill="white"></rect>-->
<!--                <circle r="200" cx="205" cy="205" fill="black"></circle>-->
                <path d="M 0 0 H 50 V 900   V 900 H 0" fill="black" stroke="none"></path>
                
            </clipPath>
        </svg>
        <div class="vw-100 vh-100 w3-teal w3-abs top w3-grid place-center" id="top-0">
            <div class="w3-card w3-col s6">
                <div class="w3-center w3-padding-top"><img src="img/logo.png" alt="" class="w3-image"></div>
                
                <div class="w3-row"> 
                </div> 
            </div>
         
        </div>

        
        <div class="vw-100 vh-100 w3-light-gray w3-grid place-center w3-abs top"  id="top-1"> 
            <h3 class="w3-center">Imagine<br>A<br>Mobile<br>Shopping Experience</h3> 
        </div> 
        <div class="vw-100 vh-100 w3-blue w3-abs top w3-grid place-center"  id="top-2">
            <h3>Greetings</h3> 
        </div>
        
    </div>
</div>
<style>
   #clipper {
    z-index: 4;
   }
   #clipper path {
    transition: all .05s;
   }
   /*svg circle {*/
   /*     fill: black;*/
   /*}*/
   /*#top-0 {*/
   /*     clip-path: url(#clipper);*/
   /*}*/
   /*#top-0 {*/
   /* z-index: 4;*/
   /*}*/
   /*#top-1 {*/
   /* z-index: 3;*/
   /*}*/
   /*#top-2 {*/
   /* z-index: 2;*/
   /*}*/
   .w3-abs { 
     position: absolute;
   }
   .liq-lay{
     /*height: 100%;*/
     /*width: 100%;*/
   }
    
</style>
<!--        <svg class="w3-abs liq-lay"  >-->
<!--            <defs>-->
<!--                <mask id="clipper" x="0" y="0" height="100%" width="100%">-->
<!--                    <rect x="0" y="0" height="100%" width="100%"></rect>     -->
<!--                    <circle r="200" cx="250" cy="250" fill="white"></circle>-->
<!--                 </mask>-->
<!--             </defs>-->
<!--             <rect x="0" y="0" height="100%" width="100%"></rect>  -->
<!--         </svg>-->        
        `;

    }
    loadTargetElements() {
        this.liquid = this.getElements('.pg-container-h')[0]
        this.mask = this.getElements('path')[0];
        this.elements = this.getElements('.top');
        this.isDragging = false;
    }
    attachAttributesNLogic() {
        this.elements.forEach((el,idx) => {
            el.style.zIndex = this.elements.length + 1 - idx;
        });
        this.elements[0].style.clipPath = 'url(#clipper)';
        this.mask.setAttributeNS(null, 'd', wave({x: MARGIN_WIDTH, y:(innerHeight/2)}));
        this.liquidEvents();
    }
    liquidEvents() {
        // this.liquid.onload = this.liquidMkDraggable.bind(this);
        this.liquid.addEventListener('touchstart', this.evStart.bind(this), false);
        // this.mask.addEventListener('touchstart', this.evStart.bind(this))
        this.liquid.addEventListener('touchmove', this.evMove.bind(this), false);
        this.liquid.addEventListener('touchend', this.evEnd.bind(this), false)
    }
    moveMask(x,y, isCap) {
        // console.trace({x , y});
        this.mask.style.transition = 'all';
        this.mask.style.transitionDuration = '.02s';
        this.mask.style.transitionTimingFunction = 'linear';
        if (!isCap) {
            this.mask.style.transitionDuration = '.8s';
            this.mask.style.transitionTimingFunction = 'ease-in-out';
        }

        this.mask.setAttributeNS(null, 'd', wave({x,y}, isCap ));
        if (x > innerWidth - MARGIN_WIDTH) {
            this.isDragging = false;
            this.mask.style.transition = 'none';
            this.mask.setAttributeNS(null, 'd', wave({x:30,y: innerHeight/2},isCap));
            this.mask.style.transition = 'all';
            this.mask.style.transitionDuration = '.02s';
            this.mask.style.transitionTimingFunction = 'linear';
            const elements = this.getElements('.top');
            /**
             * @param {HTMLElement} screen
             * @param {number} idx
             * */
            function switchScreen(screen, idx) {
                if (screen.style.zIndex==='2'){
                    screen.style.zIndex= '4';
                    screen.style.clipPath = 'url("#clipper")';
                }
                else if (screen.style.zIndex === '3'){
                    screen.style.zIndex = '2';
                }
                else if (screen.style.clipPath === 'url("#clipper")'){
                    screen.style.zIndex = '3';
                    screen.style.clipPath = '';
                }


            }
            elements.forEach(switchScreen);
        }

    }


    liquidMkDraggable() {
        // const stepY = x.value - MIN_LEDGE; // R = 50
        // const stepX = R.value / 2; // R/2
        // // 0.5522847498 is taken from https://spencermortensen.com/articles/bezier-circle/
        // const C = stepY * 0.5522847498;
    }
    evStart(ev){
        ev.preventDefault();
        if (ev.touches[0].clientX < MARGIN_WIDTH + 30) {
            this.isDragging = true;
            this.moveMask(ev.touches[0].clientX, ev.touches[0].clientY, this.isDragging);
        }

    }
    evEnd(ev){

        // console.log(this.isDragging, 'done')
        this.isDragging = false;

        ev.preventDefault();
        this.moveMask(30, innerHeight/2 , this.isDragging);

        // console.log('ended')
    }
    evMove(ev) {
        ev.preventDefault();
        if (this.isDragging) {
            this.moveMask(ev.touches[0].clientX, ev.touches[0].clientY, this.isDragging);
        }
    }
    getMousePosition(evt) {
        let currentTransformMatrix = evt.target.getScreenCTM();
        console.log(this.liquid.getBBox());
        return {
            x: (evt.clientX - currentTransformMatrix.e) / currentTransformMatrix.a,
            y: (evt.clientY - currentTransformMatrix.f) / currentTransformMatrix.d
        };
    }
}
