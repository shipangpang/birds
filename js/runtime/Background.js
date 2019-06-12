import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

//背景图
export class Background extends Sprite{
    constructor(){
        const img = Sprite.getImage('background');
        //获取canvas宽高
        const width = DataStore.getInstance().canvas.width;
        const height = DataStore.getInstance().canvas.height;
        super(img,0,0,img.width,img.height,0,0,width,height);
    }
}