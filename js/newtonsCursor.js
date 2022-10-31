class NewtonsCursor{
    constructor(cv, options={}){
        this.cv = cv;
        this.cursorPosition = {
            x : 0,
            y : 0
        }
        this.options = options;
        this.pointsNbr = options.pointsCount ?? 30;
        this.radius = options.radius ?? 50;
        this.g = options.g ?? 19.81;
        this.points = []
        this.init();
    }
    updateCursorPosition(e){
        this.cursorPosition = {
            x : e.clientX,
            y : e.clientY
        }
        this.points.forEach(point => point.move(this.cursorPosition))

    }
    sumonPoints(){
        for (let index = 0; index < this.pointsNbr; index++) {
            this.points.push(
                new NewtonsCursorPoint(this.cv, 2 * Math.PI / this.pointsNbr * index, this.radius)
            );
        }
    }
    draw(ctx){
        this.points.forEach(point => point.draw())
    }
    init(){
        window.addEventListener("mousemove", this.updateCursorPosition.bind(this));
        this.cv.subscribe(this.draw.bind(this));
        this.sumonPoints()
    }
}

const nc = new NewtonsCursor(cv)