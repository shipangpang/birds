import { ResourceLoader } from "./js/base/ResourceLoader.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Director } from "./js/Director.js";
import { Land } from "./js/runtime/Land.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";



//程序主类
export class Main{
    constructor(){
        console.log('game start!');
        //获取canvas
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        //画图
        // const img =new Image();
        // img.src = './res/background.png';
        // img.onload = ()=>{
        //     this.ctx.drawImage(img,0,0,img.width,img.height);
        // }
        //获取资源加载器
        this.loader = new ResourceLoader();
        // console.log(this.loader);

        //获取变量池
        this.dataStore =  DataStore.getInstance();

        //获取导演
        this.director = Director.getInstance();

        //调用ResourceLoader的onloaded方法获取已经加载成功的图片
        this.loader.onloaded(map=>this.onResourceLoader(map));
    }
        //资源加载成功后的方法
        onResourceLoader(map){
            //将数据保存进变量池中(永久保存,不需要销毁)
            //put方法保存进去的数据会在游戏结束时销毁
            this.dataStore.canvas = this.canvas;
            this.dataStore.ctx = this.ctx;
            this.dataStore.res =map;
            this.init();
        }
        //数据的初始化
        init(){
            //修改 isGameOver的值
            this.director.isGameOver = false;
            //创建游戏过程中使用到的对象,并将其put进变量池
            //使用put保存的数据,在游戏结束时会全部销毁
            this.dataStore
                            .put('background',new Background())
                            .put('land',new Land())
                            .put('pipes',[])
                            .put('birds',new Birds())
                            .put('startButton',new StartButton())
                            .put('score', new Score());


            //                
          this.registEvent();        
           //创建水管
           this.director.createPipes();
            //导演发令执行
            this.director.run();    
        }
        //添加屏幕单击事件
        registEvent(){
          this.canvas.addEventListener('touchstart',e=>{
              //判断游戏是否结束
              if(this.director.isGameOver){
                  //如果游戏结束,点击重新开始
                  this.init();
                 
              }else{
                  //如果游戏正在运行,点击,小鸟向上飞行一段距离
                  this.director.birdsEvent();     
              }
              
        });
     }
}