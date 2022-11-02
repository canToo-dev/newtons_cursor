class VectorsUtils{
    constructor(){

    }
    cartesianToPolar(x, y){
        return {
            distance : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
            angle : Math.atan(x/y)
        }
    }
    polarToCartesian(distance, angle){
        return {
            x : distance * Math.cos( angle ),
            y : distance * Math.sin( angle )
        }
    }
}