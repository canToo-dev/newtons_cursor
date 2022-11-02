class Interactable extends VectorsUtils{
    constructor(el, cv){
        this.el = el;
        this.cv = cv;
        this.init();
        this.mass = 2500;
    } 
    defineProperties(){
        this.box = this.el.getBoundingClientRect();
        this.center = {
            x : this.box.right - ((this.box.right - this.box.left) / 2),
            y : this.box.bottom - ((this.box.bottom - this.box.top) / 2)
        }
        this.width = this.box.right - this.box.left;
        this.height = this.box.bottom - this.box.top;
    }
    init(){
        this.cv.subscribe(this.draw.bind(this));
        this.defineProperties();

    }
    draw(){ // used to draw the barycenter of interectable
        this.defineProperties();
        this.cv.ctx.beginPath();
        this.cv.ctx.arc(this.center.x, this.center.y, 5, 0, 2 * Math.PI);
        this.cv.ctx.stroke();
    }
    computeAttraction(point){ // I'm pretty sure that the bug's here

        const xDistance = this.center.x - point.coordinates.x;
        const yDistance = this.center.y - point.coordinates.y;
        
        const polar = this.cartesianToPolar(xDistance, yDistance);
        
        const intensity = 9.81 * ((this.mass * point.mass)/Math.pow(polar.distance, 2));
        point.addInfluence({
            distance : intensity,
            angle : polar.angle
        })
    }
}