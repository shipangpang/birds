import { DataStore } from "./base/DataStore.js";
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

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
    //创建水管
    createPipes(){
        //设置top的最大值与最小值
        const minTop = this.dataStore.canvas.height/5;
        const maxTop = this.dataStore.canvas.height/3;
        const top = Math.random()*(maxTop-minTop)+minTop;
        //创建水管
        const up  = new UpPipe(top);
        const down = new DownPipe(top);
        //将创建的水管存入pipes数组中
        this.dataStore.get('pipes').push(up);
        this.dataStore.get('pipes').push(down);
    }

    //执行方法
    run(){
        //获取背景图
        this.dataStore.get('background').draw();
        //获取所有水管的数组
        const pipes = this.dataStore.get('pipes');
        //删除出界的一组水管
        if(pipes[0].x+pipes[0].width<0&&pipes.length==4){
            pipes.shift();
            pipes.shift();
        }
        //创建水管
        const width = this.dataStore.canvas.width/2;
        
        if(pipes[0].x <= width-pipes[0].width&&pipes.length==2){
            this.createPipes();
        }
        for(let i=0;i<pipes.length;i++){
            pipes[i].draw();
        }
         
        this.dataStore.get('birds').draw();

        //定时器,让run方法不停的运行
        // setTimeout(()=>this.run(),30);
        //定时器,靠浏览器自动刷新,不用设置时间
        let time = requestAnimationFrame(()=>this.run());
        //清除time
        //cancelAnimationFrame(time);
        this.dataStore.get('land').draw();
    }
}