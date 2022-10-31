class CV {
    constructor(el){
        this.el = el;
        this.ctx = el.getContext('2d')
        this.cbs = []
        this.interactables = [];
        this.init();
    }
    subscribe(cb){ //used to subscribe each class to the draw method
        this.cbs.push(cb);
    }
    addInteractable(el){ //used to add an interectable
        this.interactables.push(new Interactable(el, this))
    }
    init(){
        this.loop();
        this.resize()
        window.addEventListener("resize", this.resize.bind(this))
    }
    resize(){
        this.el.width = innerWidth;
        this.el.height = innerHeight;
    }
    loop(){
        this.ctx.clearRect(0, 0, this.el.width, this.el.height);
        this.cbs.forEach(cb => cb(this.ctx));
        requestAnimationFrame(this.loop.bind(this));
    }
}

const cv = new CV(document.getElementById("cv"));
cv.addInteractable(document.getElementById("in"));