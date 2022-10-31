class NewtonsCursorPoint{
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
        this.coordinates = {
            x : (pointerCoords.x + this.distance * Math.cos( this.angle )) 
            - Math.abs((this.influences.distance) * Math.cos( this.influences.angle )),
            y : (pointerCoords.y + this.distance * Math.sin( this.angle )) - 
            Math.abs(this.influences.distance * Math.sin( this.influences.angle ))
        }
    }
    resetInfluences (){
        this.influences ={
            distance : 0,
            angle : 0
        }
    }
    draw(pointerCoords){
        this.resetInfluences();
        this.computeInterectablesInfluence();
        this.computeOffset(pointerCoords)
        this.cv.ctx.beginPath();
        this.cv.ctx.arc(this.coordinates.x, this.coordinates.y, 5, 0, 2 * Math.PI);
        this.cv.ctx.stroke();
    }
}