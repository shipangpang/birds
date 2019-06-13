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
        return Director.instance;
    }

    //执行方法
    run(){
        this.dataStore.get('background').draw();
    }
}