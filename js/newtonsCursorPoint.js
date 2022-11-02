class NewtonsCursorPoint extends VectorsUtils{
    constructor(cv, angle, distance){
        this.angle = angle;
        this.distance = distance;
        this.coordinates = {
            x : 0,
            y : 0
        }
        this.cv = cv;
        this.mass = 60;
        this.influences = {
            angle :  0,
            distance: 0
        }
    }
    addInfluence(influence){ // used to append an influence to the point
        this.influences={
            angle : this.influences.angle + influence.angle,
            distance : this.influences.distance + influence.distance
        }
    }
    computeInterectablesInfluence(){
        cv.interactables.forEach((interactable)=>{
                interactable.computeAttraction(this)
        })
    }

    computeOffset(pointerCoords){
        const pointOffset = this.polarToCartesian(this.distance, this.angle);
        const pointInfluences = this.polarToCartesian(this.influences.distance, this.influences.angle);
        this.coordinates = {
            x : pointerCoords.x + pointOffset.x - pointInfluences.x,
            y : (pointerCoords.y + pointOffset.y  ) - pointInfluences.y
        }
    }
    resetInfluences (){
        this.influences ={
            distance : 0,
            angle : 0
        }
    }
    move(pointerCoords){
        this.resetInfluences();
        this.computeInterectablesInfluence();
        this.computeOffset(pointerCoords)
    }
    draw(){
        this.cv.ctx.beginPath();
        this.cv.ctx.arc(this.coordinates.x, this.coordinates.y, 5, 0, 2 * Math.PI);
        this.cv.ctx.stroke();
    }
}