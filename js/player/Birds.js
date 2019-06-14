import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";


//小鸟类
export class Birds extends Sprite{
    constructor(){
        const img = Sprite.getImage('birds');
        super (img,0,0,img.width,img.height,0,0,img.width,img.height);
        //小鸟的宽34,高24,上下边距10,左右边距9
        this.clippingX = [9,9+34+18,9+34+18+34+18];//裁剪的x坐标
        this.clippingY = 10;//裁剪的y坐标
        this.clippingW = 34;//裁剪的宽度
        this.clippingH = 24;//裁剪的高度
        const dataStore = DataStore.getInstance();
        const canvas = DataStore.getInstance().canvas;
        this.x = canvas.width/6;//绘制canvas上的x坐标
        // const land = dataStore.get('land').srcH;
        const land = dataStore.res.get('land').height;//获取地板的高度
        this.y = (canvas.height-land)/2;//绘制canvas上的y坐标
        
        this.count = 0;//计数器,减少小鸟切换的频率
        this.index = 0;//小鸟数组的下标,根据下标的切换,实现小鸟的动态效果
        this.time =0;//计时器

    }
    draw(){
        this.count++;
        if(this.index>=2){
            //this.count>=30也可以
            this.count =0;
        }
        this.index = Math.floor(this.count/10);
        //模拟自由落体运动
        this.time++;
        const g = 0.098/4;
        const up = 30;
        let drop = g*this.time*(this.time-up)/2;//掉落的距离
        this.y = this.y +drop;
        
         this.srcX = this.clippingX[this.index];
         this.srcY = this.clippingY;
         this.srcW = this.clippingW;
         this.srcH = this.clippingH;
         //  this.y
         this.width = this.clippingW;
         this.height = this.clippingH;
         super.draw();
            
    }
   

}