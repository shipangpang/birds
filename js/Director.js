import { DataStore } from "./base/DataStore.js";

//导演类,控制游戏的主逻辑流程
export class Director{
    constructor(){
        this.dataStore = DataStore.getInstance();

    }
    //单例,所有人获取的都是同一个Director
    static getInstance(){
        if(!Director.instance){
            Director.instance = new Director();
        }
        // console.log(Director.instance);
        
        return Director.instance;
    }

    //执行方法
    run(){
        this.dataStore.get('background').draw();
        this.dataStore.get('land').draw();
        //定时器,让run方法不停的运行
        // setTimeout(()=>this.run(),30);
        //定时器,靠浏览器自动刷新,不用设置时间
      let time = requestAnimationFrame(()=>this.run());
      //清除time
     //cancelAnimationFrame(time);
    }
}