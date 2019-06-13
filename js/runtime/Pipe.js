import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


//水管的父类
export class Pipe extends Sprite{
    constructor(img,top){
        const canvasW = DataStore.getInstance().canvas.width;
        super(img,0,0,img.width,img.height,canvasW,0,img.width,img.height);
        this.top = top;
        this.speed = 2;

    }
    draw(){
        this.x = this.x-this.speed;
        super.draw();
    }
}
