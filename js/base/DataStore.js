//变量池,游戏过程中的数据的保存与销毁

export class DataStore{
    constructor(){
        console.log('创建了一个新的变量池');
        this.map = new Map();
    }
    //变量池只能有一个,只能创建一个实例对象(单例)
    //static修饰的方法,可以使用DataStore类名直接调用
    static getInstance(){
        if(!DataStore.instance){
            DataStore.instance = new DataStore();
        }
        return DataStore.instance;
    }
    //存数据
    put(key,value){
        this.map.set(key,value);
        return this;//返回变量池,方便链式调用
    }
    //取数据
    get(key){
      return  this.map.get(key);
    }
    //销毁数据
    destroy(){
        for(let v of this.map.values()){
            v = null;
        }
    }

}